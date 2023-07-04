"use strict";

initBurger();

function initBurger() {
  var burger = document.querySelector(".header_burger");
  var burgerMenu = document.querySelector(".nav");
  burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    burgerMenu.classList.toggle("menu_active");
  });
}
//# sourceMappingURL=main.js.map
