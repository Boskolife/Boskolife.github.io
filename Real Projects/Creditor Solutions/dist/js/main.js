"use strict";

initTabs();
initBurger();
initNavBtn();
findHref();

function findHref() {
  var element = document.getElementById('menu').getElementsByTagName('a');
  var url = window.location.href;

  for (var i = 0; i < element.length; i++) {
    if (url === element[i].href) {
      element[i].classList.add('item_active');
    }
  }

  ;
}

function initBurger() {
  var burger = document.querySelector(".burger_menu");
  var menuBody = document.querySelector(".nav");
  var phone = document.querySelector(".phone");
  burger.addEventListener('click', function () {
    menuBody.classList.toggle('menu_active');
    phone.classList.toggle('menu_active');
    burger.classList.toggle("burger_active");
    document.body.classList.toggle("body_lock");
  });
}

function initTabs() {
  var faqTabs = document.querySelector('#faqTabs');
  if (!faqTabs) return;
  var tabs = document.querySelectorAll('.tab_title'),
      tabsContent = document.querySelectorAll('.tab_content'),
      tabsParent = document.querySelector('.tab_wrapper');

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.toggle('show');
    tabs[i].classList.toggle('tab_active');
  }

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
  !window.location.href.includes('faq') && showTabContent();
}

function initNavBtn() {
  var flyBtn = document.querySelector('#flyBtn');
  var flyBtn_2 = document.querySelector('#flyBtn_2');
  if (!flyBtn && !flyBtn_2) return;
  var navBtn = document.querySelector('.nav_btn'),
      navTable = document.querySelector('.nav_table'),
      navLink = document.querySelectorAll('.nav_table_link');
  navBtn.addEventListener('click', function () {
    navTable.classList.toggle('show_table');
    document.body.classList.toggle("body_lock");
  });
  navLink.forEach(function (item) {
    item.addEventListener('click', function () {
      navTable.classList.remove('show_table');
      document.body.classList.remove("body_lock");
    });
  });
  ScrollTrigger.create({
    trigger: "#flyBtn_2",
    start: "top top",
    endTrigger: "#otherID",
    end: "bottom 50%+=100px",
    onToggle: function onToggle(self) {
      return console.log("toggled, isActive:", self.isActive);
    },
    onUpdate: function onUpdate(self) {
      console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
    }
  });
}
//# sourceMappingURL=main.js.map
