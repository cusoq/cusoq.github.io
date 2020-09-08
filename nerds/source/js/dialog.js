var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var popupDialog = document.querySelector('.write-us');
var popupButton = document.querySelector('.button__contacts');
var popupClose = document.querySelector('.write-us__close-popup');
var popupForm = document.querySelector('.write-us__form');

// открытие попапа
var openPopup = function (popup) {
  popup.classList.remove('visually-hidden');
};
// закрытие попапа
var closePopup = function (popup) {
  popup.classList.add('visually-hidden');
  window.removeEventListener('keydown', onEscCloser, onSubmit);
};
// хэндлеры
var onEscCloser = function () {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup(popupDialog);
  }
};

var onCrossClick = function () {
  event.preventDefault();
  closePopup(popupDialog);
};

var onWriteUsEnter = function () {
  event.preventDefault();
  if (event.keyCode === ENTER_KEYCODE) {
    openPopup(popupDialog);
  }
};
var onWriteUsClick = function () {
  event.preventDefault();
  openPopup(popupDialog);
};

var onSubmit = function () {
  closePopup(popupDialog);
  popupForm.reset();
};
// закрытие попапа по Esc
document.addEventListener('keydown', onEscCloser);
// закрытие попапа по click
popupClose.addEventListener('click', onCrossClick);
// закрытие попапа по submit
popupForm.addEventListener('submit', onSubmit);
// обрабатываем открытие диалогового окна по Enter на аватар
popupButton.addEventListener('keydown', onWriteUsEnter);
// обрабатываем открытие диалогового окна по клику на аватар
popupButton.addEventListener('click', onWriteUsClick);
