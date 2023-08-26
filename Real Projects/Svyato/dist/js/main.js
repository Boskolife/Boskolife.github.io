"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

initBurger();
anchorListener();
findHref();
initSwiper();

function initSwiper() {
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

  destroySlidersOnResize(".logo_swiper", 9999, {
    slidesPerView: 5.5,
    spaceBetween: 30,
    speed: 2000,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    breakpoints: {
      320: {
        slidesPerView: 2
      },
      480: {
        slidesPerView: 2.5
      },
      768: {
        slidesPerView: 3.5
      },
      1024: {
        slidesPerView: 5.5
      }
    }
  });
  destroySlidersOnResize(".landscapes_swiper", 9999, {
    slidesPerView: "auto",
    speed: 2000,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    autoHeight: true,
    scrollbar: {
      el: ".swiper-scrollbar"
    },
    breakpoints: {
      320: {
        spaceBetween: 10
      },
      1024: {
        spaceBetween: 30
      }
    }
  });
  destroySlidersOnResize(".landscapes_page_swiper", 9999, {
    direction: "vertical",
    spaceBetween: 30,
    speed: 1000,
    mousewheel: {
      releaseOnEdges: true
    },
    scrollbar: {
      el: ".swiper-scrollbar"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction"
    }
  });
}

function initBurger() {
  var menu = document.querySelector(".nav");
  var burger = document.querySelector(".header_burger");
  var menuItems = document.querySelectorAll(".menu_item");
  burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    menu.classList.toggle("menu_active");
    document.body.classList.toggle("body_lock");
  });
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      burger.classList.remove("burger_active");
      menu.classList.remove("menu_active");
      document.body.classList.remove("body_lock");
    });
  });
}

function anchorListener() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth > 1024) {
    return;
  }

  var targetElements = document.querySelectorAll(".hoverCard");
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
  };

  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("orangeHover");
      } else {
        entry.target.classList.remove("orangeHover");
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);
  targetElements.forEach(function (targetElement) {
    observer.observe(targetElement);
  });
}

function findHref() {
  var element = document.getElementById("menu").getElementsByTagName("a");
  var url = window.location.href;

  for (var i = 0; i < element.length; i++) {
    if (url === element[i].href) {
      element[i].classList.add("item_active");
    }
  }
}
//# sourceMappingURL=main.js.map
