var ESC_KEYCODE=27,ENTER_KEYCODE=13,popupDialog=document.querySelector(".write-us"),popupButton=document.querySelector(".button__contacts"),popupClose=document.querySelector(".write-us__close-popup"),popupForm=document.querySelector(".write-us__form"),openPopup=function(e){e.classList.remove("visually-hidden")},closePopup=function(e){e.classList.add("visually-hidden"),window.removeEventListener("keydown",onEscCloser,onSubmit)},onEscCloser=function(){event.keyCode===ESC_KEYCODE&&closePopup(popupDialog)},onCrossClick=function(){event.preventDefault(),closePopup(popupDialog)},onWriteUsEnter=function(){event.preventDefault(),event.keyCode===ENTER_KEYCODE&&openPopup(popupDialog)},onWriteUsClick=function(){event.preventDefault(),openPopup(popupDialog)},onSubmit=function(){closePopup(popupDialog),popupForm.reset()};document.addEventListener("keydown",onEscCloser),popupClose.addEventListener("click",onCrossClick),popupForm.addEventListener("submit",onSubmit),popupButton.addEventListener("keydown",onWriteUsEnter),popupButton.addEventListener("click",onWriteUsClick);