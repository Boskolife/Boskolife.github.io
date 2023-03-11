"use strict";

//Burger
var burger = document.querySelector(".burger_menu");
var menuBody = document.querySelector(".nav");
var phone = document.querySelector(".phone");
burger.addEventListener('click', function () {
  menuBody.classList.toggle('menu_active');
  phone.classList.toggle('menu_active');
  burger.classList.toggle("burger_active");
  document.body.classList.toggle("body_lock");
}); //Tabs

var tabs = document.querySelectorAll('.tab_title'),
    tabsContent = document.querySelectorAll('.tab_content'),
    tabsParent = document.querySelector('.tab_wrapper');

function showTabContent() {
  var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  tabsContent[i].classList.toggle('show');
  tabs[i].classList.toggle('tab_active');
}

showTabContent();
tabsParent.addEventListener('click', function (event) {
  var target = event.target;

  if (target && target.classList.contains('tab_title')) {
    tabs.forEach(function (item, i) {
      if (target == item) {
        showTabContent(i);
      }
    });
  }
});
//# sourceMappingURL=main.js.map
