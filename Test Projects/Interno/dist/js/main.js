"use strict";

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
//# sourceMappingURL=main.js.map
