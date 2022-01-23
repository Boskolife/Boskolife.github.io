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
var burger = document.querySelector(".burger");
var menuBody = document.querySelector(".links");
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
jQuery(function () {
  $('.slider').slick({
    dots: false,
    speed: 1000,
    autoplay: true,
    slidesToShow: 7,
    pauseOnHover: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 6
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        arrows: false
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        arrows: false
      }
    }]
  });
});
new WOW().init();
//# sourceMappingURL=main.js.map
