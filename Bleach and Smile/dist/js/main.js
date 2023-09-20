"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

ininSwiper();
initBurger();
initBeerSlider();

function ininSwiper() {
  function destroySlidersOnResize(selector, width, obj, moreThan) {
    var init = _objectSpread({}, obj);

    var win = window;
    var sliderSelector = document.querySelector(selector);

    if (!sliderSelector) {
      return;
    }

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

  destroySlidersOnResize(".reviews_swiper", 9999, {
    spaceBetween: 20,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      1024: {
        direction: "vertical"
      }
    }
  });
  destroySlidersOnResize(".contact_swiper", 9999, {
    spaceBetween: 20,
    direction: "horizontal",
    simulateTouch: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination"
    },
    breakpoints: {
      1024: {
        direction: "vertical"
      }
    }
  });
  destroySlidersOnResize(".post_swiper", 9999, {
    spaceBetween: 20,
    direction: "horizontal",
    simulateTouch: true,
    breakpoints: {
      1024: {
        direction: "vertical",
        pagination: {
          el: ".swiper-pagination"
        }
      }
    }
  });
  destroySlidersOnResize(".categories_swiper", 9999, {
    spaceBetween: 10,
    slidesPerView: 1.75,
    direction: "horizontal",
    simulateTouch: true,
    scrollbar: {
      el: ".swiper-scrollbar"
    },
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 2
      }
    }
  });
}

function initBurger() {
  var burger = document.querySelector(".burger_wrap");
  var menu = document.querySelector(".nav");
  var menuContainer = document.querySelector(".menu_container");
  burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    menu.classList.toggle("menu_active");
    menuContainer.classList.toggle("menu_container_active");
    document.body.classList.toggle("body_lock");
  });
}

function initBeerSlider() {
  var slider = new BeerSlider(document.getElementById("beer-slider"));

  if (!slider) {
    return;
  }
}

;
//# sourceMappingURL=main.js.map
