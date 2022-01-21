"use strict";

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
