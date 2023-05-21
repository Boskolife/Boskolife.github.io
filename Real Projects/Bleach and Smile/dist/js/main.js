"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

ininSwiper();
initBurger();

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
} // var slider = document.getElementById("slider");
// var imageBefore = document.querySelector(".before img");
// var imageAfter = document.querySelector(".after img");
// var containerWidth = slider.parentNode.offsetWidth;
// var sliderWidth = slider.offsetWidth;
// var isDragging = false;
// var startX;
// var startLeft;
// function updateImageClipPath(percentage) {
//     var clipPathValue =
//         "polygon(0 0, " + percentage + "% 0, " + percentage + "% 100%, 0 100%)";
//     imageBefore.style.clipPath = clipPathValue;
//     imageAfter.style.clipPath = clipPathValue;
// }
// slider.addEventListener("mousedown", function (event) {
//     event.preventDefault();
//     isDragging = true;
//     slider.classList.add("dragging");
//     startX = event.clientX;
//     startLeft = slider.offsetLeft;
// });
// document.addEventListener("mousemove", function (event) {
//     if (isDragging) {
//         var offsetX = event.clientX - startX;
//         var newPosition = Math.max(
//             0,
//             Math.min(containerWidth - sliderWidth, startLeft + offsetX)
//         );
//         var percentage = (newPosition / containerWidth) * 100;
//         slider.style.left = newPosition + "px";
//         updateImageClipPath(percentage);
//     }
// });
// document.addEventListener("mouseup", function () {
//     if (isDragging) {
//         isDragging = false;
//         slider.classList.remove("dragging");
//     }
// });
// // Обновляем путь обрезки изображений при изменении размеров окна
// window.addEventListener("resize", function () {
//     containerWidth = slider.parentNode.offsetWidth;
//     var currentPosition = parseInt(slider.style.left, 10);
//     var percentage = (currentPosition / containerWidth) * 100;
//     updateImageClipPath(percentage);
// });
// // Инициализация пути обрезки изображений при загрузке страницы
// var initialPosition = containerWidth / 2;
// slider.style.left = initialPosition + "px";
// updateImageClipPath(50);
//# sourceMappingURL=main.js.map
