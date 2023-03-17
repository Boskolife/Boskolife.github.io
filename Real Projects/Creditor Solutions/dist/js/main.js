"use strict";

initTabs();
initBurger();
initNavBtn();
findHref();
getMonth();
getYear();
getDay();
hideText();

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
  document.addEventListener('click', function (event) {
    if (burger.contains(event.target)) {
      menuBody.classList.toggle('menu_active');
      burger.classList.toggle("burger_active");
      document.body.classList.toggle("body_lock");
      return;
    }

    if (!menuBody.contains(event.target)) {
      menuBody.classList.remove("menu_active");
      burger.classList.remove("burger_active");
      document.body.classList.remove("body_lock");
    }
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
  if (!flyBtn) return;
  var navBtn = document.querySelector('.nav_btn'),
      navTable = document.querySelector('.nav_table'),
      navLink = document.querySelectorAll('.nav_table_link'),
      footer = document.querySelector('#footer');
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
    trigger: ".nav_table",
    start: "-90px top",
    endTrigger: "#footer",
    toggleClass: "fixed",
    end: "top 80%+=100px",
    onLeave: function onLeave(self) {
      self.trigger.classList.add('fixBottom');
      self.trigger.style.bottom = "".concat(footer.clientHeight + 50, "px");
    },
    onEnterBack: function onEnterBack(self) {
      self.trigger.classList.remove('fixBottom');
    }
  });
  ScrollTrigger.create({
    trigger: "#flyBtn",
    start: "top bottom",
    endTrigger: "#footer",
    toggleClass: "active",
    end: "top bottom",
    onLeave: function onLeave(self) {
      self.trigger.classList.add('hide');
    },
    onEnterBack: function onEnterBack(self) {
      self.trigger.classList.remove('hide');
    }
  });
}

function hideText() {
  var spoiler = document.querySelector('.spoiler');
  var button = document.querySelector('.spoiler-button');
  button.textContent = 'Show more';

  function replaceText() {
    if (button.textContent === 'Show more') {
      button.textContent = 'Show less';
      document.querySelector('.dots').style.display = 'none';
      button.style.display = 'block';
    } else {
      button.textContent = 'Show more';
      document.querySelector('.dots').style.display = 'inline';
      button.style.display = 'inline';
    }
  }

  button.addEventListener('click', function () {
    spoiler.classList.toggle('show');
    replaceText();
  });
}

function getDay() {
  var monthSelect = document.getElementById("month-select");
  var yearSelect = document.getElementById("year-select");
  var daySelect = document.getElementById("day-select");

  var daysInMonth = function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  };

  var populateDays = function populateDays() {
    var month = parseInt(monthSelect.value, 10);
    var year = parseInt(yearSelect.value, 10);
    var days = daysInMonth(month, year);
    daySelect.innerHTML = "";

    for (var day = 1; day <= days; day++) {
      var option = document.createElement("option");
      option.value = day;
      option.text = day;
      daySelect.appendChild(option);
    }

    daySelect.querySelector('option:first-child').selected = true;
  };

  populateDays();
  monthSelect.addEventListener("change", populateDays);
  yearSelect.addEventListener("change", populateDays);
}

function getMonth() {
  var select = document.getElementById("month-select");
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  months.forEach(function (month, i) {
    var option = document.createElement("option");
    option.value = i;
    option.text = month;
    select.appendChild(option);
  });
  select.options[0].selected = true;
}

function getYear() {
  var select = document.getElementById("year-select");
  var currentYear = new Date().getFullYear();
  var endYear = currentYear + 2;
  var startYear = 2000;

  for (var year = startYear; year <= endYear; year++) {
    var option = document.createElement("option");
    option.value = year;
    option.text = year;
    select.appendChild(option);
  }

  select.querySelector("option[value='2000']").selected = true;
}

function calcPages() {
  var firstBtn = document.getElementById('second_next');
  var secondBtn = document.getElementById('third_next');
  var startOverBtn = document.getElementById('start_over');
  var firstStep = document.getElementById('first_step');
  var secondStep = document.getElementById('second_step');
  var thirdStep = document.getElementById('third_step');
  var stepOne = document.getElementById('step_one');
  var stepTwo = document.getElementById('step_two');
  firstBtn.addEventListener('click', function (e) {
    e.preventDefault();
    firstStep.classList.remove('step_show');
    secondStep.classList.add('step_show');
    stepOne.classList.remove('active_wrap');
    stepTwo.classList.add('active_wrap');
  });
  secondBtn.addEventListener('click', function (e) {
    e.preventDefault();
    secondStep.classList.remove('step_show');
    thirdStep.classList.add('step_show');
  });
  startOverBtn.addEventListener('click', function (e) {
    e.preventDefault();
    thirdStep.classList.remove('step_show');
    firstStep.classList.add('step_show');
  });
}

calcPages();
//# sourceMappingURL=main.js.map
