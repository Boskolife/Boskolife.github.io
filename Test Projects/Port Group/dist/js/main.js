"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var burger = document.querySelector(".header-burger");
var menuBody = document.querySelector(".nav");
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

function initSliders(selector, width, obj) {
  var init = _objectSpread({
    infinite: false,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  }, obj);

  $(function () {
    var win = $(window);
    var slider = $(selector);
    win.on("load resize", function () {
      if (win.width() <= width) {
        slider.not(".slick-initialized").slick(init);
      } else if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
      }
    });
  });
}

;
initSliders(".service-item-block", 1024, {
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
  infinite: true,
  dots: true,
  arrows: false,
  adaptiveHeight: true,
  touchThreshold: 50,
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 1
    }
  }]
});
initSliders(".bot-dev-text", 1024, {
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
  infinite: true,
  dots: true,
  arrows: false,
  adaptiveHeight: true,
  touchThreshold: 50,
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 1
    }
  }]
});
initSliders(".reviews-content", 1024, {
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
  infinite: true,
  dots: true,
  arrows: false,
  adaptiveHeight: true,
  touchThreshold: 50,
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 1
    }
  }]
});
new WOW().init();
//# sourceMappingURL=main.js.map
