'use strict';

(function () {
  // Количество отображаемых пинов
  var PINS_NUMBER = 5;

  // Ценовые диапазоны для фильтруемых объявлений
  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');
  var data = []; // исходные данные
  var filteredData = [];
  var getFilteredData = function () {
    filteredData = data.slice(0);
  };
  var filteredItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filtrationByType = function (item) {
    return filteredItem(typeSelect, item.offer, 'type');
  };

  var filtrationByPrice = function (item) {
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filtrationByRooms = function (item) {
    return filteredItem(roomsSelect, item.offer, 'rooms');
  };

  var filtrationByGuests = function (item) {
    return filteredItem(guestsSelect, item.offer, 'guests');
  };

  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  // Отображение отфильтрованных пинов на карте
  var onFilterChange = window.util.debounce(function () {
    getFilteredData();
    var filtrationByAllTypes = [filtrationByType, filtrationByPrice, filtrationByRooms, filtrationByGuests, filtrationByFeatures];
    filteredData = filteredData.filter(function (ad) {
      return filtrationByAllTypes.every(function (fn) {
        return fn(ad);
      });
    });
    window.map.removePins();
    window.map.removeMapCard();
    window.data.cards = filteredData.slice(0, PINS_NUMBER);
    window.pins.insertFragmentPin();
  });

  var activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    filter.addEventListener('change', onFilterChange);
  };

  var deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    getFilteredData();
    window.map.removePins();
    window.map.removeMapCard();
    window.data.cards = filteredData.slice(0, PINS_NUMBER);
    window.pins.insertFragmentPin();
  };

  var activate = function (response) {
    data = response.slice();
    activateFilter();
    return data.slice(0, PINS_NUMBER);
  };

  var deactivate = function () {
    deactivateFilter();
    filter.reset();
  };

  window.filter = {
    PINS_NUMBER: PINS_NUMBER,
    activate: activate,
    deactivate: deactivate
  };
})();
