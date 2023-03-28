"use strict";

initBurger();

function initBurger() {
  var burger = document.querySelector('.burger_menu');
  burger.addEventListener('click', function () {
    burger.classList.toggle('burger_active');
  });
}
//# sourceMappingURL=main.js.map
