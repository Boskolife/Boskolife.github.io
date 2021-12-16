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
//# sourceMappingURL=main.js.map
