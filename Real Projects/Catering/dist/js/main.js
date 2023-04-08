"use strict";

initBurger();
initTabs();

function initBurger() {
  var burger = document.querySelector(".burger_menu");
  burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    document.body.classList.toggle("body_lock");
  });
}

function initTabs() {
  var faqTabs = document.querySelector("#faqTabs");
  if (!faqTabs) return;
  var tabs = document.querySelectorAll(".tab_title"),
      tabsContent = document.querySelectorAll(".tab_content"),
      tabsParent = document.querySelector(".tab_wrapper"),
      closeItem = document.querySelectorAll(".open_status");

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.toggle("show");
    tabs[i].classList.toggle("tab_active");
    closeItem[i].classList.toggle("open_active");
  }

  tabsParent.addEventListener("click", function (event) {
    var target = event.target;

    if (target && target.classList.contains("tab_title")) {
      tabs.forEach(function (item, i) {
        if (target == item) {
          showTabContent(i);
        }
      });
    }
  });
}
//# sourceMappingURL=main.js.map
