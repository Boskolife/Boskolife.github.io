"use strict";

// Swiper:
// function destroySlidersOnResize(selector, width, obj, moreThan) {
//     const init = {
//       ...obj,
//     };
//     const win = window;
//     const sliderSelector = document.querySelector(selector);
//     let swiper = new Swiper(selector, init);
//     const toggleInit = () => {
//       const neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width
//       if (neededWidth) {
//         if (!sliderSelector.classList.contains("swiper-initialized")) {
//           swiper = new Swiper(selector, init);
//         }
//       } else if (sliderSelector.classList.contains("swiper-initialized")) {
//         swiper.destroy();
//       }
//     };
//     ["load", "resize"].forEach((evt) =>
//       win.addEventListener(evt, toggleInit, false)
//     );
// }
// destroySlidersOnResize(".me-slider", 960, {
//     spaceBetween: 20,
//     pagination: {
//       el: ".swiper-pagination",
//     },
// });
function initBurger() {
  var burger = document.querySelector('.burger_wrap');
  var menu = document.querySelector('.nav');
  var menuContainer = document.querySelector('.menu_container');
  burger.addEventListener('click', function () {
    burger.classList.toggle('burger_active');
    menu.classList.toggle('menu_active');
    menuContainer.classList.toggle('menu_container_active');
    document.body.classList.toggle('body_lock');
  });
}

initBurger();
//# sourceMappingURL=main.js.map
