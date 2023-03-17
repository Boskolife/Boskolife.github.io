"use strict";

initTabs();
initBurger();
initNavBtn();
findHref();
getMonth();
getYear();
getDay();
hideText();
calcPages();

function findHref() {
  var element = document.getElementById("menu").getElementsByTagName("a");
  var url = window.location.href;

  for (var i = 0; i < element.length; i++) {
    if (url === element[i].href) {
      element[i].classList.add("item_active");
    }
  }
}

function initBurger() {
  var burger = document.querySelector(".burger_menu");
  var menuBody = document.querySelector(".nav");
  document.addEventListener("click", function (event) {
    if (burger.contains(event.target)) {
      menuBody.classList.toggle("menu_active");
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
  var faqTabs = document.querySelector("#faqTabs");
  if (!faqTabs) return;
  var tabs = document.querySelectorAll(".tab_title"),
      tabsContent = document.querySelectorAll(".tab_content"),
      tabsParent = document.querySelector(".tab_wrapper");

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.toggle("show");
    tabs[i].classList.toggle("tab_active");
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
  !window.location.href.includes("faq") && showTabContent();
}

function initNavBtn() {
  var flyBtn = document.querySelector("#flyBtn");
  if (!flyBtn) return;
  var navBtn = document.querySelector(".nav_btn"),
      navTable = document.querySelector(".nav_table"),
      navLink = document.querySelectorAll(".nav_table_link"),
      footer = document.querySelector("#footer");
  navBtn.addEventListener("click", function () {
    navTable.classList.toggle("show_table");
    document.body.classList.toggle("body_lock");
  });
  navLink.forEach(function (item) {
    item.addEventListener("click", function () {
      navTable.classList.remove("show_table");
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
      self.trigger.classList.add("fixBottom"); // self.trigger.style.bottom = `${footer.clientHeight + 50}px`;
    },
    onEnterBack: function onEnterBack(self) {
      self.trigger.classList.remove("fixBottom");
    }
  });
  ScrollTrigger.create({
    trigger: "#flyBtn",
    start: "top bottom",
    endTrigger: "#footer",
    toggleClass: "active",
    end: "top bottom",
    onLeave: function onLeave(self) {
      self.trigger.classList.add("hide");
    },
    onEnterBack: function onEnterBack(self) {
      self.trigger.classList.remove("hide");
    }
  });
}

function hideText() {
  var spoiler = document.querySelector(".spoiler");
  var button = document.querySelector(".spoiler-button");
  button.textContent = "Show more";

  function replaceText() {
    if (button.textContent === "Show more") {
      button.textContent = "Show less";
      document.querySelector(".dots").style.display = "none";
      button.style.display = "block";
    } else {
      button.textContent = "Show more";
      document.querySelector(".dots").style.display = "inline";
      button.style.display = "inline";
    }
  }

  button.addEventListener("click", function () {
    spoiler.classList.toggle("show");
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
    var seletedValue = daySelect.value;
    daySelect.innerHTML = "";

    for (var day = 1; day <= days; day++) {
      var option = document.createElement("option");
      option.value = day;
      option.text = day;
      daySelect.appendChild(option);
    }

    seletedValue ? daySelect.querySelector("option:nth-child(".concat(seletedValue, ")")).selected = true : daySelect.querySelector("option:first-child").selected = true;
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
  var amountInput = document.querySelector('#summ');
  var monthSelect = document.getElementById("month-select");
  var yearSelect = document.getElementById("year-select");
  var daySelect = document.getElementById("day-select");
  var awardEl = document.querySelector('#award');
  var interestRateEl = document.querySelector('#interestRate');
  var totalEl = document.querySelector('#total');
  var AMOUNT_REGEX = /^\d+\.?\d?(\d+)?$/;
  var monthValue = monthSelect.value;
  var yearValue = yearSelect.value;
  var dayValue = daySelect.value;

  var getInputDate = function getInputDate() {
    return "".concat(yearValue, "-").concat(+monthValue + 1, "-").concat(dayValue);
  };

  var fullYear = getInputDate();
  var amountValue = '';
  var result;

  var resetCalculator = function resetCalculator() {
    yearSelect.querySelector("option[value='2000']").selected = true;
    yearValue = yearSelect.value;
    monthSelect.options[0].selected = true;
    monthValue = monthSelect.value;
    daySelect.querySelector("option:first-child").selected = true;
    dayValue = daySelect.value;
    amountInput.value = '';
    amountValue = '';
    thirdStep.classList.remove('step_show');
    firstStep.classList.add('step_show');
  };

  firstBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!amountValue) return;
    firstStep.classList.remove("step_show");
    secondStep.classList.add("step_show");
    stepOne.classList.remove("active_wrap");
    stepTwo.classList.add("active_wrap");
  });
  secondBtn.addEventListener("click", function (e) {
    e.preventDefault();
    secondStep.classList.remove('step_show');
    thirdStep.classList.add('step_show');
    fullYear = getInputDate();
    result = nyJudgmentInterest(+amountValue, fullYear);
    awardEl.textContent = "$".concat(Number.parseFloat(amountValue).toFixed(2));
    interestRateEl.textContent = "$".concat(result.interest.toFixed(2));
    totalEl.textContent = "$".concat(result.totalValue.toFixed(2));
  });
  startOverBtn.addEventListener("click", function (e) {
    e.preventDefault();
    resetCalculator();
  });
  amountInput.addEventListener('input', function (e) {
    var targetValue = e.target.value.replace(/\$/g, '').trim();

    if (!targetValue) {
      e.target.value = '';
      amountValue = '';
      return;
    }

    if (!AMOUNT_REGEX.test(targetValue)) {
      e.target.value = "$ ".concat(amountValue);
      return;
    }

    e.target.value = "$ ".concat(targetValue);
    amountValue = targetValue;
  });
  monthSelect.addEventListener('change', function (e) {
    monthValue = e.target.value;
  });
  yearSelect.addEventListener('change', function (e) {
    yearValue = e.target.value;
  });
  daySelect.addEventListener('change', function (e) {
    dayValue = e.target.value;
  });
}

function nyJudgmentInterest(judgmentAmount, judgmentDate) {
  var beforeApril30Rate = 0.75; // 9% year or 0.75 per month interest rate before April 30, 2022

  var afterApril30Rate = 0.167; // 2% year or 0.167 per month interest rate after April 30, 2022

  var april30Date = new Date('2022-04-30'); // date when interest rate changes

  var today = new Date(); // Calculate the number of months between the judgment date and April 30, 2022

  var months = (today.getFullYear() - new Date(judgmentDate).getFullYear()) * 12 + (today.getMonth() - new Date(judgmentDate).getMonth()); // Determine the interest rate based on the judgment date

  var rate = judgmentDate < april30Date ? beforeApril30Rate : afterApril30Rate;
  var interestRatePerMonth = judgmentAmount / 100 * rate; // Calculate the total interest earned

  var interest = interestRatePerMonth * months; // Calculate the total value of the judgment including interest

  var totalValue = judgmentAmount + interest;
  return {
    interest: interest,
    totalValue: totalValue
  };
}
//# sourceMappingURL=main.js.map
