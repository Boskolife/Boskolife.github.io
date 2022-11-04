"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* paralax */
var m2 = document.getElementById('m2');
var m3 = document.getElementById('m3');
var cloud1 = document.getElementById('cloud1');
var cloud2 = document.getElementById('cloud2');
var cloud3 = document.getElementById('cloud3');
var text = document.getElementById('text');
var msec = document.getElementById('msec');
var tsec = document.getElementById('tsec');
window.addEventListener('scroll', function () {
  var value = window.scrollY;
  var endParalax = tsec.offsetTop + tsec.offsetHeight;
  var laptop = window.matchMedia("(min-width: 1450px)");
  var widescreen = window.matchMedia("(min-width: 1200px)");
  var tablet = window.matchMedia("(min-width: 768px)");
  var phone = window.matchMedia("(min-width: 480px)");

  if (value > endParalax) {
    return;
  }

  if (laptop.matches) {
    m2.style.top = 475 + value * 0.05 + 'px';
    m3.style.top = 390 + value * -0.3 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 340 + value * 0.2 + 'px';
    cloud2.style.bottom = -325 + value * 0.2 + 'px';
    cloud3.style.bottom = -15 + value * 0.2 + 'px';
    text.style.top = 415 + value * 0.3 + 'px';
    msec.style.minHeight = 1785 + value * -0.3 + 'px';
  } else if (widescreen.matches) {
    m2.style.top = 350 + value * 0.05 + 'px';
    m3.style.top = 200 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 240 + value * 0.1 + 'px';
    cloud2.style.bottom = -240 + value * 0.1 + 'px';
    cloud3.style.bottom = -15 + value * 0.1 + 'px';
    text.style.top = 220 + value * 0.3 + 'px';
    msec.style.minHeight = 1205 + value * -0.2 + 'px';
  } else if (tablet.matches) {
    m2.style.top = 265 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 240 + value * 0.1 + 'px';
    cloud2.style.bottom = -240 + value * 0.1 + 'px';
    cloud3.style.bottom = -40 + value * 0.1 + 'px';
    text.style.top = 120 + value * 0.3 + 'px';
    msec.style.minHeight = 940 + value * -0.2 + 'px';
  } else if (phone.matches) {
    m2.style.top = 185 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -100 + value * -0.3 + 'px';
    cloud1.style.bottom = 80 + value * 0.1 + 'px';
    cloud2.style.bottom = -140 + value * 0.1 + 'px';
    cloud3.style.bottom = -40 + value * 0.1 + 'px';
    text.style.top = 160 + value * 0.3 + 'px';
    msec.style.minHeight = 640 + value * -0.2 + 'px';
  } else {
    m2.style.top = 185 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -100 + value * -0.3 + 'px';
    cloud1.style.bottom = 80 + value * 0.1 + 'px';
    cloud2.style.bottom = -70 + value * 0.1 + 'px';
    cloud3.style.bottom = value * 0.1 + 'px';
    text.style.top = 160 + value * 0.3 + 'px';
    msec.style.minHeight = 640 + value * -0.2 + 'px';
  }
});
/* ///// */

var burger = document.querySelector(".burger_menu");
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

; // Swiper:

function destroySlidersOnResize(selector, width, obj, moreThan) {
  var init = _objectSpread({}, obj);

  var win = window;
  var sliderSelector = document.querySelector(selector);
  var swiper = new Swiper(selector, init);

  var toggleInit = function toggleInit() {
    var neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width;

    if (neededWidth) {
      if (!sliderSelector.classList.contains("swiper-initialized")) {
        swiper = new Swiper(selector, init);
      }
    } else if (sliderSelector.classList.contains("swiper-initialized")) {
      swiper.destroy();
    }
  };

  ["load", "resize"].forEach(function (evt) {
    return win.addEventListener(evt, toggleInit, false);
  });
}

destroySlidersOnResize(".reviews-slider", 9999, {
  slidesPerView: 2,
  watchOverflow: true,
  speed: 800,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});
/* Parallax Cursor Position */

document.addEventListener("mousemove", parallax);

function parallax(event) {
  this.querySelectorAll(".parallax-wrap #parallax").forEach(function (shift) {
    var position = shift.getAttribute("value");
    var x = (window.innerWidth - event.pageX * position) / 90;
    var y = (window.innerHeight - event.pageY * position) / 90;
    shift.style.transform = "translateX(".concat(x, "px) translateY(").concat(y, "px)");
  });
}
/* ///// */
//# sourceMappingURL=main.js.map
