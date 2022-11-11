"use strict";

jQuery(function () {
  $('.slider').slick({
    arrows: false,
    dots: true,
    speed: 1000,
    slideToShow: 2
  });
  $('.slider-reviews').slick({
    arrows: false,
    dots: true,
    speed: 1000,
    slidesToShow: 2,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }]
  });
});
var burger = document.querySelector(".header-burger");
var menuBody = document.querySelector(".feedback-header");
var linkClose = document.querySelector(".link-close");

if (burger) {
  burger.addEventListener("click", function (e) {
    document.body.classList.toggle("body_lock");
    burger.classList.toggle("burger_active");
    menuBody.classList.toggle("menu_active");
  });
}

;

if (linkClose) {
  linkClose.addEventListener("click", function (e) {
    document.body.classList.remove("body_lock");
    burger.classList.remove("burger_active");
    menuBody.classList.remove("menu_active");
  });
}

;
var popupBg = document.querySelector('.popup-bg'); // Фон попап окна

var popup = document.querySelector('.popup'); // Само окно

var openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна

var closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach(function (button) {
  // Перебираем все кнопки
  button.addEventListener('click', function (e) {
    // Для каждой вешаем обработчик событий на клик
    e.preventDefault(); // Предотвращаем дефолтное поведение браузера

    popupBg.classList.add('active'); // Добавляем класс 'active' для фона

    popup.classList.add('active'); // И для самого окна
  });
});
closePopupButton.addEventListener('click', function () {
  // Вешаем обработчик на крестик
  popupBg.classList.remove('active'); // Убираем активный класс с фона

  popup.classList.remove('active'); // И с окна
});
document.addEventListener('click', function (e) {
  // Вешаем обработчик на весь документ
  if (e.target === popupBg) {
    // Если цель клика - фот, то:
    popupBg.classList.remove('active'); // Убираем активный класс с фона

    popup.classList.remove('active'); // И с окна
  }
});
//# sourceMappingURL=main.js.map
