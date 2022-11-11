"use strict";

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
jQuery(function () {
  $('.slider').slick({
    dots: false,
    arrows: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    speed: 1000,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        autoplay: true
      }
    }]
  });
});
new WOW().init();
//# sourceMappingURL=main.js.map
