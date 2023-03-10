"use strict";

var burger = document.querySelector(".burger_menu");
var menuBody = document.querySelector(".nav");
var phone = document.querySelector(".phone");
burger.addEventListener('click', function () {
  menuBody.classList.toggle('menu_active');
  phone.classList.toggle('menu_active');
  burger.classList.toggle("burger_active");
  document.body.style.overflow = 'hidden';
});
//# sourceMappingURL=main.js.map
