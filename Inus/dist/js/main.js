"use strict";

var burger = document.querySelector(".burger");
var menuBody = document.querySelector(".main-links");
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
var acc = document.getElementsByClassName("button-spoller");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

jQuery(function () {
  $('.slider').slick({
    dots: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 3,
    responsive: [{
      breakpoint: 1600,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 1140,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  $('.slider-gallery').slick({
    dots: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 3,
    responsive: [{
      breakpoint: 1600,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 1140,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  $('.reviews-content').slick({
    dots: false,
    speed: 1000,
    autoplay: false,
    slidesToShow: 4,
    responsive: [{
      breakpoint: 1250,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        dots: true
      }
    }]
  });
});
//# sourceMappingURL=main.js.map
