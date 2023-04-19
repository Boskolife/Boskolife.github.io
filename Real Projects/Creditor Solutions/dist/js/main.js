"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Spinner = /*#__PURE__*/function () {
  function Spinner() {
    _classCallCheck(this, Spinner);

    this.spinnerEl = "\n        <div class=\"spinner loadingio-spinner-spin-nir07jtyl1o\">\n        <div class=\"spinner-container\">\n          <div class=\"ldio-5desmbk2c7\">\n            <div>\n                <div></div>\n            </div>\n            <div>\n                <div></div>\n            </div>\n            <div>\n                <div></div>\n            </div>\n            <div>\n                <div></div>\n            </div>\n            <div>\n                <div></div>\n            </div>\n            <div>\n                <div></div>\n            </div>\n            <div>\n                <div></div>\n            </div>\n            <div>\n                <div></div>\n            </div>\n          </div>\n        </div>\n      </div>";
    this.init();
    this.spinner = document.querySelector(".spinner");
  }

  _createClass(Spinner, [{
    key: "init",
    value: function init() {
      if (!this.isInit) {
        document.body.insertAdjacentHTML("beforeend", this.spinnerEl);
        this.isInit = true;
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.spinner.classList.add("visible");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.spinner.classList.remove("visible");
    }
  }]);

  return Spinner;
}();

var spinner = new Spinner();
var winTriggersMethods = ["resize", "load"];
var MOBILE_SIZE = 480;
var prevWidth = window.innerWidth;
var EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var CS_CONTACT_API = 'https://api.creditorsolutions.com/Judgment/contact';
var CS_FILE_API = "https://api.creditorsolutions.com/Judgment/AddId";
initBurger();
initNavBtn();
findHref();
renderDateSelects();
hideText();
calcPages();
jsonAnimation();
jsonCardAnimation();
jsonAwardHover();
jsonAnimationSmallClaims();
jsonAnimationIndividual();
jsonAnimationEnforce();
setActiveClass();
openFileModal();
initTabs();
contactForm();

function contactForm() {
  var form = document.querySelector("#contactForm");
  if (!form) return;
  var successMsg = form.querySelector(".success-text");
  var fName = form.querySelector("#fName");
  var fNameValue = fName.value;
  var lName = form.querySelector("#lName");
  var lNameValue = lName.value;
  var email = form.querySelector("#email");
  var emailValue = email.value;
  var msg = form.querySelector("#msg");
  var msgValue = msg.value;

  var showError = function showError(el) {
    el.closest(".field").querySelector(".error_text").classList.add("d-block");
  };

  var hideError = function hideError(el) {
    el.closest(".field").querySelector(".error_text").classList.remove("d-block");
  };

  fName.addEventListener("input", function (e) {
    fNameValue = e.target.value;
    !fNameValue ? showError(fName) : hideError(fName);
  });
  lName.addEventListener("input", function (e) {
    lNameValue = e.target.value;
    !lNameValue ? showError(lName) : hideError(lName);
  });
  email.addEventListener("input", function (e) {
    emailValue = e.target.value;
    !emailValue ? showError(email) : hideError(email);
  });
  msg.addEventListener("input", function (e) {
    msgValue = e.target.value;
    !msgValue ? showError(msg) : hideError(msg);
  });
  form.addEventListener("submit", function (e) {
    successMsg.classList.remove("d-block");
    e.preventDefault();
    var isValid = false;
    !fNameValue ? showError(fName) : hideError(fName);
    !lNameValue ? showError(lName) : hideError(lName);
    !emailValue ? showError(email) : hideError(email);
    !msgValue ? showError(msg) : hideError(msg);
    !EMAIL_REGEX.test(emailValue) ? showError(email) : hideError(email);

    if (!fNameValue || !lNameValue || !emailValue || !msgValue || !EMAIL_REGEX.test(emailValue)) {
      isValid = false;
    } else {
      isValid = true;
    }

    if (isValid) {
      spinner.show();
      postData(CS_CONTACT_API, {
        firstName: fNameValue,
        lastName: lNameValue,
        email: emailValue,
        message: msgValue
      }).then(function () {
        successMsg.classList.add("d-block");
      }).finally(function () {
        spinner.hide();
      });
    }
  });
}

function initTabs() {
  var faqTabs = document.querySelector("#faqTabs");
  if (!faqTabs) return;
  var tabs = document.querySelectorAll(".tab_title"),
      tabsWrap = document.querySelectorAll(".tabs"),
      tabsContent = document.querySelectorAll(".tab_content"),
      tabsParent = document.querySelector(".tab_wrapper");

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.toggle("show");
    tabs[i].classList.toggle("tab_active");
    window.location.href.includes("faq") && tabsWrap[i].classList.toggle("active_tabsWrap");
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

winTriggersMethods.forEach(function (method) {
  window.addEventListener(method, function () {
    // worst case to refresh animation?
    var puzzlesAnimation = document.querySelector(".puzzles-container");
    if (!puzzlesAnimation) return;

    if (method === "load") {
      initPuzzleAnimation();
    }

    if (method === "resize" && prevWidth !== window.innerWidth) {
      var _ScrollTrigger;

      (_ScrollTrigger = ScrollTrigger) === null || _ScrollTrigger === void 0 ? void 0 : _ScrollTrigger.killAll();
      prevWidth = window.innerWidth;
      initPuzzleAnimation();
      return;
    }
  });
});

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
    if (event.target.classList.contains("btn_modal")) {
      return;
    }

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

function initNavBtn() {
  var flyBtn = document.querySelector("#flyBtn");
  if (!flyBtn) return;
  var navBtn = document.querySelectorAll(".nav_btn"),
      navTable = document.querySelector(".nav_table"),
      navLink = document.querySelectorAll(".nav_table_link"),
      header = document.querySelector("#header");
  navBtn.forEach(function (item) {
    item.addEventListener("click", function () {
      navTable.classList.toggle("show_table");
      document.body.classList.toggle("body_lock");
    });
  });
  navLink.forEach(function (item) {
    item.addEventListener("click", function () {
      navTable.classList.remove("show_table");
      document.body.classList.remove("body_lock");
    });
  });
  var fixedNav = ScrollTrigger.create({
    trigger: ".nav_table",
    start: "-90px top",
    endTrigger: "#footer",
    end: "top top+=".concat(navTable.clientHeight + header.clientHeight + 25),
    pin: true
  });

  var toggleFixedNav = function toggleFixedNav() {
    return window.outerWidth < 1024 ? fixedNav.disable() : fixedNav.enable();
  };

  window.addEventListener("resize", toggleFixedNav);
  window.addEventListener("load", toggleFixedNav);
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
    } // markers: true

  });
}

function hideText() {
  var buttons = document.querySelectorAll(".spoiler-button");
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.textContent = "Show more";
    btn.addEventListener("click", function () {
      var spoiler = btn.previousElementSibling;
      spoiler.classList.toggle("show");
      replaceText(btn);
    });
  });

  function replaceText(btn) {
    if (btn.textContent === "Show more") {
      btn.textContent = "Show less";
      document.querySelector(".dots").style.display = "none";
      btn.style.display = "block";
    } else {
      btn.textContent = "Show more";
      document.querySelector(".dots").style.display = "inline";
      btn.style.display = "inline";
    }
  }
}

function renderDateSelects() {
  getMonth();
  getYear();
  getDay();

  function getDay() {
    var monthSelect = document.getElementById("month-select");
    var yearSelect = document.getElementById("year-select");
    var daySelect = document.getElementById("day-select");
    if (!monthSelect || !yearSelect || !daySelect) return;

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
        daySelect === null || daySelect === void 0 ? void 0 : daySelect.appendChild(option);
      }

      seletedValue ? daySelect.querySelector("option:nth-child(".concat(seletedValue, ")")).selected = true : daySelect.querySelector("option:first-child").selected = true;
    };

    populateDays();
    monthSelect.addEventListener("change", populateDays);
    yearSelect.addEventListener("change", populateDays);
  }

  function getMonth() {
    var select = document.getElementById("month-select");
    if (!select) return;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach(function (month, i) {
      var option = document.createElement("option");
      option.value = i;
      option.text = month;
      select === null || select === void 0 ? void 0 : select.appendChild(option);
    });
    select ? select.options[0].selected = true : null;
  }

  function getYear() {
    var select = document.getElementById("year-select");
    if (!select) return;
    var currentYear = new Date().getFullYear();
    var endYear = currentYear + 2;
    var startYear = 2000;

    for (var year = startYear; year <= endYear; year++) {
      var option = document.createElement("option");
      option.value = year;
      option.text = year;
      select === null || select === void 0 ? void 0 : select.appendChild(option);
    }

    select.querySelector("option[value='2000']").selected = true;
  }
}

function calcPages() {
  var calsParent = document.querySelector(".calc_steps");
  if (!calsParent) return;
  var firstBtn = document.getElementById("second_next");
  var secondBtn = document.getElementById("third_next");
  var startOverBtn = document.getElementById("start_over");
  var firstStep = document.getElementById("first_step");
  var secondStep = document.getElementById("second_step");
  var thirdStep = document.getElementById("third_step");
  var stepOne = document.getElementById("step_one");
  var stepTwo = document.getElementById("step_two");
  var stepThree = document.getElementById("step_three");
  var amountInput = document.querySelector("#summ");
  var monthSelect = document.getElementById("month-select");
  var yearSelect = document.getElementById("year-select");
  var daySelect = document.getElementById("day-select");
  var awardEl = document.querySelector("#award");
  var interestRateEl = document.querySelector("#interestRate");
  var totalEl = document.querySelector("#total");
  var AMOUNT_REGEX = /^\d+\.?\d?(\d+)?$/;
  var currentDate = document.getElementById("daySelect");
  var monthValue = monthSelect.value;
  var yearValue = yearSelect.value;
  var dayValue = daySelect.value;

  var getInputDate = function getInputDate() {
    return "".concat(yearValue, "-").concat(+monthValue + 1, "-").concat(dayValue);
  };

  var fullYear = getInputDate();
  var amountValue = "";
  var result;
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  function maskCurrency(value) {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    });
    return "".concat(formatter.format(value).slice(0, 1), " ").concat(formatter.format(value).slice(1));
  }

  function calculated() {
    fullYear = getInputDate();
    result = nyJudgmentInterest(+amountValue, fullYear);
    currentDate.textContent = result.formateDate;
    awardEl.textContent = formatter.format(Number.parseFloat(amountValue));
    interestRateEl.textContent = formatter.format(Number.parseFloat(result.interest));
    totalEl.textContent = formatter.format(Number.parseFloat(result.totalValue));
  }

  var resetCalculator = function resetCalculator() {
    yearSelect.querySelector("option[value='2000']").selected = true;
    yearValue = yearSelect.value;
    monthSelect.options[0].selected = true;
    monthValue = monthSelect.value;
    daySelect.querySelector("option:first-child").selected = true;
    dayValue = daySelect.value;
    amountInput.value = "";
    amountValue = "";
    thirdStep.classList.remove("step_show");
    firstStep.classList.add("step_show");
    stepOne.classList.add("active_wrap");
    stepThree.classList.remove("active_wrap");
  };

  stepOne.addEventListener("click", function (e) {
    e.preventDefault();
    secondStep.classList.remove("step_show");
    firstStep.classList.add("step_show");
    stepTwo.classList.remove("active_wrap");
    stepOne.classList.add("active_wrap");
    thirdStep.classList.remove("step_show");
    stepThree.classList.remove("active_wrap");
  });
  stepTwo.addEventListener("click", function (e) {
    e.preventDefault();

    if (!amountValue) {
      amountInput.parentNode.classList.add("error");
      return;
    }

    firstStep.classList.remove("step_show");
    secondStep.classList.add("step_show");
    thirdStep.classList.remove("step_show");
    stepOne.classList.remove("active_wrap");
    stepTwo.classList.add("active_wrap");
    stepThree.classList.remove("active_wrap");
    calculated();
  });
  stepThree.addEventListener("click", function (e) {
    e.preventDefault();

    if (!amountValue) {
      amountInput.parentNode.classList.add("error");
      return;
    }

    thirdStep.classList.add("step_show");
    firstStep.classList.remove("step_show");
    secondStep.classList.remove("step_show");
    stepThree.classList.add("active_wrap");
    stepOne.classList.remove("active_wrap");
    stepTwo.classList.remove("active_wrap");
  });
  firstBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!amountValue) {
      amountInput.parentNode.classList.add("error");
      return;
    }

    amountInput.parentNode.classList.remove("error");
    firstStep.classList.remove("step_show");
    secondStep.classList.add("step_show");
    stepOne.classList.remove("active_wrap");
    stepTwo.classList.add("active_wrap");
  });
  secondBtn.addEventListener("click", function (e) {
    e.preventDefault();
    secondStep.classList.remove("step_show");
    thirdStep.classList.add("step_show");
    stepTwo.classList.remove("active_wrap");
    stepThree.classList.add("active_wrap");
    calculated();
  });
  startOverBtn.addEventListener("click", function (e) {
    e.preventDefault();
    resetCalculator();
  });
  amountInput.addEventListener("input", function (e) {
    var targetValue = e.target.value.replace(/[^\d.-]/g, "");

    if (!targetValue) {
      e.target.value = "";
      amountValue = "";
      return;
    }

    if (!AMOUNT_REGEX.test(targetValue)) {
      e.target.value = "$ ".concat(amountValue);
      return;
    }

    amountInput.parentNode.classList.remove("error");
    e.target.value = maskCurrency(targetValue);
    amountValue = targetValue;
  });
  monthSelect.addEventListener("change", function (e) {
    monthValue = e.target.value;
  });
  yearSelect.addEventListener("change", function (e) {
    yearValue = e.target.value;
  });
  daySelect.addEventListener("change", function (e) {
    dayValue = e.target.value;
  });
}

function nyJudgmentInterest(judgmentAmount, date) {
  var judgmentDate = date.split("-").map(function (num) {
    return +num < 10 ? "0".concat(num) : num;
  }).join("-");
  var beforeApril30Rate = 0.75; // 9% year or 0.75 per month interest rate before April 30, 2022

  var afterApril30Rate = 0.167; // 2% year or 0.167 per month interest rate after April 30, 2022

  var april30Date = new Date("2022-04-30"); // date when interest rate changes

  var today = new Date();
  var judgDate = new Date(judgmentDate);
  var localDate = judgDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).split("/");
  var formateDate = "".concat(localDate[0] < 10 ? "0".concat(localDate[0]) : localDate[0], "/").concat(localDate[1] < 10 ? "0".concat(localDate[1]) : localDate[1], "/").concat(localDate[2]); // Calculate the number of months between the judgment date and April 30, 2022

  var months = (today.getFullYear() - judgDate.getFullYear()) * 12 + (today.getMonth() - judgDate.getMonth()); // Determine the interest rate based on the judgment date

  var rate = judgDate < april30Date ? beforeApril30Rate : afterApril30Rate;
  var interestRatePerMonth = judgmentAmount / 100 * rate; // Calculate the total interest earned

  var interest = interestRatePerMonth * months; // Calculate the total value of the judgment including interest

  var totalValue = judgmentAmount + interest;
  return {
    interest: interest,
    totalValue: totalValue,
    formateDate: formateDate
  };
}

function initPuzzleAnimation() {
  if (!document.querySelector(".puzzle")) return;
  var header = document.querySelector("header");
  var headerHeight = header.clientHeight;
  var isMobile = window.innerWidth < MOBILE_SIZE;
  initFirstAnimSection();
  initSecondAnimSection();
  initThirdAnimSection();

  function initFirstAnimSection() {
    var animationFirstSection = document.querySelector(".puzzle-animation-first");

    if (!animationFirstSection) {
      return;
    }

    var puzzleTopLeft = animationFirstSection.querySelector(".puzzle-top-left");
    var puzzleTopRight = animationFirstSection.querySelector(".puzzle-top-right");
    var puzzleBottomRight = animationFirstSection.querySelector(".puzzle-bottom-right");
    var puzzleBottomLeft = animationFirstSection.querySelector(".puzzle-bottom-left");

    var getPosXtopRight = function getPosXtopRight() {
      return window.innerWidth / 2 - puzzleTopRight.clientWidth / 2;
    };

    if (isMobile) {
      mobileAnimation();
    } else {
      desktopAnimation();
    }

    function mobileAnimation() {
      gsap.fromTo(puzzleTopRight, {
        x: 250,
        opacity: 0
      }, {
        x: 150,
        opacity: 1
      });
      gsap.fromTo(puzzleTopRight, {
        x: 150
      }, {
        x: 0,
        scrollTrigger: {
          trigger: animationFirstSection,
          start: "top top",
          end: "50%-=".concat(headerHeight),
          scrub: 1
        }
      });
      gsap.fromTo(puzzleTopLeft, {
        x: -250,
        y: -80,
        opacity: 0
      }, {
        x: 0,
        y: -80,
        opacity: 1
      });
      gsap.fromTo(puzzleTopLeft, {
        y: -80
      }, {
        y: 0,
        scrollTrigger: {
          trigger: animationFirstSection,
          start: "top top",
          end: "50%-=".concat(headerHeight),
          scrub: 1
        }
      });
      gsap.fromTo(puzzleBottomLeft, {
        x: -250,
        opacity: 0
      }, {
        x: -125,
        opacity: 1
      });
      gsap.fromTo(puzzleBottomLeft, {
        x: -125
      }, {
        x: 0,
        scrollTrigger: {
          trigger: animationFirstSection,
          start: "top top",
          end: "50%-=".concat(headerHeight),
          scrub: 1
        }
      });
      gsap.fromTo(puzzleBottomRight, {
        x: 250,
        y: 150,
        opacity: 0
      }, {
        x: 0,
        y: 150,
        opacity: 1
      });
      gsap.fromTo(puzzleBottomRight, {
        y: 150
      }, {
        y: 0,
        scrollTrigger: {
          trigger: animationFirstSection,
          start: "top top",
          end: "50%-=".concat(headerHeight),
          scrub: 1
        }
      });
    }

    function desktopAnimation() {
      gsap.fromTo(puzzleTopRight, {
        x: 250
      }, {
        x: 0
      });
      gsap.fromTo(puzzleTopRight, {
        x: 0
      }, {
        x: function x() {
          return -getPosXtopRight();
        },
        scrollTrigger: {
          trigger: animationFirstSection,
          start: "top top",
          end: "50%-=".concat(headerHeight),
          scrub: 1
        }
      });
      gsap.to(puzzleBottomRight, {
        x: function x() {
          return -getPosXtopRight();
        },
        duration: 0
      });
      gsap.to(puzzleBottomRight, {
        y: -270,
        scrollTrigger: {
          trigger: animationFirstSection,
          start: "top+=".concat(headerHeight, " top"),
          end: "50%-=".concat(headerHeight),
          scrub: 1
        }
      });
      gsap.fromTo(puzzleBottomLeft, {
        x: -250
      }, {
        x: 0
      });
      gsap.fromTo(puzzleBottomLeft, {
        x: 0
      }, {
        x: function x() {
          return getPosXtopRight();
        },
        scrollTrigger: {
          trigger: animationFirstSection,
          start: "top top",
          end: "50%-=".concat(headerHeight),
          scrub: 1
        }
      });
    }
  }

  function initSecondAnimSection() {
    var section = document.querySelector(".puzzle-animation-second");

    if (!section) {
      return;
    }

    var isStopCenter = section.classList.contains("stop-center");
    var puzzlesContainer = section.querySelector(".puzzles-container");
    var leftSide = section.querySelector(".left-side");
    var rightSide = section.querySelector(".right-side");
    var puzzleTopLeft = section.querySelector(".puzzle-top-left");
    var puzzleTopRight = section.querySelector(".puzzle-top-right");
    var puzzleBottomRight = section.querySelector(".puzzle-bottom-right");
    var puzzleBottomLeft = section.querySelector(".puzzle-bottom-left");

    var getPosXLeft = function getPosXLeft() {
      return window.innerWidth / 2 - puzzleTopLeft.clientWidth / 2;
    };

    var getPosYLeft = function getPosYLeft() {
      return section.clientHeight / 2;
    };

    var getPosXRight = function getPosXRight() {
      return leftSide.clientWidth - puzzleTopLeft.clientWidth;
    };

    gsap.fromTo(puzzleTopLeft, {
      x: isMobile ? -150 : -getPosXLeft(),
      y: isMobile ? 0 : -getPosYLeft()
    }, {
      x: 0,
      y: 0,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top ".concat(isStopCenter ? "center" : ""),
        scrub: 1 // markers: true,

      }
    });
    gsap.fromTo(puzzleBottomLeft, {
      x: isMobile ? -150 : -500
    }, {
      x: 0,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top ".concat(isStopCenter ? "center" : ""),
        scrub: 1 // markers: true,

      }
    });
    gsap.fromTo(puzzleTopRight, {
      x: function x() {
        return getPosXLeft();
      }
    }, {
      x: 0,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top ".concat(isStopCenter ? "center" : ""),
        scrub: 1 //   markers: true,

      }
    });
    gsap.fromTo(puzzleBottomRight, {
      y: getPosYLeft()
    }, {
      y: function y() {
        return 0;
      },
      scrollTrigger: {
        trigger: section,
        start: "top+=200 bottom",
        end: "top ".concat(isStopCenter ? "center" : ""),
        scrub: 1 //   markers: true,

      }
    });

    if (!isStopCenter) {
      gsap.fromTo(puzzlesContainer, {
        rotation: 5,
        y: 0,
        x: 0
      }, {
        rotation: isMobile ? -35 : -35,
        y: isMobile ? 400 : -150,
        x: isMobile ? 275 : 0,
        scrollTrigger: {
          trigger: section,
          start: isMobile ? "center-=75 bottom" : "top bottom",
          end: isMobile ? "bottom+=100" : "bottom",
          scrub: 1 // markers: true,

        }
      });
    } else {
      gsap.fromTo(puzzlesContainer, {
        rotation: 5,
        y: 0,
        x: 0
      }, {
        rotation: isMobile ? -35 : -35,
        y: isMobile ? -145 : -150,
        x: isMobile ? 175 : 0,
        scrollTrigger: {
          trigger: section,
          start: isMobile ? "center+50% bottom" : "top bottom",
          end: isMobile ? "bottom" : "bottom",
          scrub: 1 // markers: true,

        }
      });
    }

    gsap.to(rightSide, {
      x: isMobile ? 125 : 375
    });
    gsap.fromTo(rightSide, {
      x: isMobile ? 125 : 375
    }, {
      x: 0,
      scrollTrigger: {
        trigger: section,
        start: "".concat(isStopCenter ? "top bottom" : "50%+=".concat(headerHeight, " bottom")),
        end: "bottom ".concat(isStopCenter ? "bottom" : ""),
        scrub: 1 // markers: true,

      }
    });
  }

  function initThirdAnimSection() {
    var section = document.querySelector(".puzzle-animation-third");

    if (!section) {
      return;
    }

    var puzzlesContainer = section.querySelector(".puzzles-container");
    var leftSide = section.querySelector(".left-side");
    var rightSide = section.querySelector(".right-side");
    var puzzleTopLeft = section.querySelector(".puzzle-top-left");
    var puzzleTopRight = section.querySelector(".puzzle-top-right");
    var puzzleBottomRight = section.querySelector(".puzzle-bottom-right");
    var puzzleBottomLeft = section.querySelector(".puzzle-bottom-left");

    if (isMobile) {
      gsap.fromTo(leftSide, {
        x: -90
      }, {
        x: 0,
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom-=100",
          scrub: 1 // markers: true,

        }
      });
    }

    gsap.fromTo(puzzlesContainer, {
      rotation: isMobile ? 13 : 20
    }, {
      rotation: isMobile ? 5 : 10,
      scrollTrigger: {
        trigger: section,
        start: "top+=200 bottom",
        end: "top",
        scrub: 1 // markers: true,

      }
    });
    gsap.fromTo(puzzleBottomRight, {
      y: isMobile ? 250 : 500
    }, {
      y: 0,
      scrollTrigger: {
        trigger: section,
        start: isMobile ? "center bottom" : "top+=200 bottom",
        end: isMobile ? "bottom-=125" : "top",
        scrub: 1 // markers: true,

      }
    });
    gsap.fromTo(puzzleBottomLeft, {
      y: isMobile ? 75 : 650
    }, {
      y: 0,
      scrollTrigger: {
        trigger: section,
        start: isMobile ? "top bottom" : "center+=200 bottom",
        end: isMobile ? "center" : "bottom-=100",
        scrub: 1 // markers: true,

      }
    });
    gsap.to(rightSide, {
      x: isMobile ? 100 : 300,
      duration: 0
    });
    gsap.fromTo(rightSide, {
      x: isMobile ? 100 : 300
    }, {
      x: 0,
      scrollTrigger: {
        trigger: section,
        start: "75%+=".concat(headerHeight, " bottom"),
        end: "bottom+=".concat(headerHeight),
        scrub: 1 // markers: true,

      }
    });
  }
}

function jsonAnimation() {
  try {
    new Array(6).fill("icon").map(function (element, i) {
      return "".concat(element, "_").concat(i + 1);
    }).forEach(function (element) {
      var icon = document.getElementById(element);

      if (!icon) {
        return;
      }

      var iconBody = icon.closest(".anim_item");
      var anim = bodymovin.loadAnimation({
        container: icon,
        path: "files/".concat(element, ".json"),
        render: "svg",
        loop: false,
        autoplay: false
      });
      iconBody.addEventListener("mouseover", function () {
        anim.play();
      });
      iconBody.addEventListener("mouseleave", function () {
        anim.stop();
      });
    });
  } catch (e) {
    console.log(e);
  }
}

function jsonCardAnimation() {
  try {
    new Array(3).fill("card").map(function (element, i) {
      return "".concat(element, "_").concat(i + 1);
    }).forEach(function (element) {
      var card = document.getElementById(element);

      if (!card) {
        return;
      }

      var cardBody = card.parentNode;
      var anim = bodymovin.loadAnimation({
        container: card,
        path: "files/".concat(element, ".json"),
        render: "svg",
        loop: false,
        autoplay: false
      });
      cardBody.addEventListener("mouseover", function () {
        anim.play();
      });
      cardBody.addEventListener("mouseleave", function () {
        anim.stop();
      });
    });
  } catch (e) {
    console.log(e);
  }
}

function setActiveClass() {
  var card = document.querySelectorAll(".card"); // замените 'your-element-class' на ваш класс элементов

  card.forEach(function (element) {
    element.addEventListener("click", function () {
      card.forEach(function (el) {
        el.classList.remove("card_border");
      });
      element.classList.add("card_border");
    });
  });
}

function jsonAwardHover() {
  try {
    var award = document.getElementById("award_anim_electr");

    if (!award) {
      return;
    }

    bodymovin.loadAnimation({
      container: award,
      path: "files/scheme_hover_electr.json",
      render: "svg",
      loop: true,
      autoplay: true
    });
  } catch (e) {
    console.log(e);
  }
}

function jsonAnimationSmallClaims() {
  try {
    new Array(3).fill("sc_icon").map(function (element, i) {
      return "".concat(element, "_").concat(i + 1);
    }).forEach(function (element) {
      var icon = document.getElementById(element);

      if (!icon) {
        return;
      }

      var iconBody = icon.closest(".anim_item");
      var anim = bodymovin.loadAnimation({
        container: icon,
        path: "files/".concat(element, ".json"),
        render: "svg",
        loop: false,
        autoplay: false
      });
      iconBody.addEventListener("mouseover", function () {
        anim.play();
      });
      iconBody.addEventListener("mouseleave", function () {
        anim.stop();
      });
    });
  } catch (e) {
    console.log(e);
  }
}

function jsonAnimationIndividual() {
  try {
    new Array(3).fill("ind_icon").map(function (element, i) {
      return "".concat(element, "_").concat(i + 1);
    }).forEach(function (element) {
      var icon = document.getElementById(element);

      if (!icon) {
        return;
      }

      var iconBody = icon.closest(".anim_item");
      var anim = bodymovin.loadAnimation({
        container: icon,
        path: "files/".concat(element, ".json"),
        render: "svg",
        loop: false,
        autoplay: false
      });
      iconBody.addEventListener("mouseover", function () {
        anim.play();
      });
      iconBody.addEventListener("mouseleave", function () {
        anim.stop();
      });
    });
  } catch (e) {
    console.log(e);
  }
}

function jsonAnimationEnforce() {
  try {
    new Array(4).fill("enf_icon").map(function (element, i) {
      return "".concat(element, "_").concat(i + 1);
    }).forEach(function (element) {
      var icon = document.getElementById(element);

      if (!icon) {
        return;
      }

      var iconBody = icon.closest(".anim_item");
      var anim = bodymovin.loadAnimation({
        container: icon,
        path: "files/".concat(element, ".json"),
        render: "svg",
        loop: false,
        autoplay: false
      });
      iconBody.addEventListener("mouseover", function () {
        anim.play();
      });
      iconBody.addEventListener("mouseleave", function () {
        anim.stop();
      });
    });
  } catch (e) {
    console.log(e);
  }
}

function fetchFile(payload) {
  return fetch(CS_FILE_API, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

function openFileModal() {
  var openFileBtn = document.querySelectorAll(".btn_modal");

  if (!openFileBtn.length) {
    return;
  }

  var isPrint = false;
  var isOpen = false;
  var isDownload = false;
  var sectionName = "";
  var fileName = "";
  var judgNumber = "";

  var getPayload = function getPayload() {
    var userId = getWithExpiry("userId");
    var prevSection = userId && userId.slice(0, 3);

    if (prevSection !== sectionName || !userId) {
      userId = "".concat(sectionName, ".").concat(uniqueId()).toUpperCase();
      setWithExpiry("userId", userId, toMilliseconds(1));
    }

    var payload = {
      sectionName: sectionName,
      fileName: fileName,
      userId: userId
    };

    if (judgNumber) {
      payload.judgNumber = judgNumber;
    }

    return payload;
  }; // TODO: delete hrefBeforeAPI


  var onActionFile = function onActionFile(blob, fileName, hrefBeforeAPI) {
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;

    if (isOpen) {
      a.setAttribute("target", "_blank");
    }

    if (isPrint) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        printPage(url);
      });
    }

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  var allBtns = document.querySelectorAll("[data-section]");
  allBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      sectionName = btn.dataset.section;
      fileName = btn.dataset.filename;
      judgNumber = "";

      if (btn.classList.contains("print_btn")) {
        isPrint = true;
        isOpen = false;
        isDownload = false;
      }

      if (btn.classList.contains("download_btn")) {
        isPrint = false;
        isOpen = false;
        isDownload = true;
      }

      if (btn.classList.contains("open_btn")) {
        isPrint = false;
        isOpen = true;
        isDownload = false;
      }

      if (!btn.classList.contains("btn_modal")) {
        var payload = getPayload();
        spinner.show();
        fetchFile(payload).then(function (resp) {
          return resp.blob();
        }) //TODO: delete btn.getAttribute('href')
        .then(function (blob) {
          return onActionFile(blob, "".concat(fileName, ".pdf"), btn.getAttribute("href"));
        }).finally(function () {
          spinner.hide();
        });
      }
    });
  });
  var fileModal = document.getElementById("fileModal");
  var selectBtn = document.getElementById("selectBtn");
  var modalContainer = document.getElementById("fileModalContainer");
  var closeBtn = document.getElementById("close_button");
  var downloadedFile = document.querySelectorAll(".choosen_file");
  selectBtn.setAttribute("href", downloadedFile[0].getAttribute("href"));
  downloadedFile.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      removeClass();
      e.target.classList.add("load");
      var hrefValue = e.target.getAttribute("href");
      selectBtn.setAttribute("href", hrefValue);

      if (isPrint || isOpen) {
        selectBtn.removeAttribute("download");
        selectBtn.removeAttribute("target");

        if (isOpen) {
          selectBtn.setAttribute("target", "_blank");
        }
      } else {
        selectBtn.setAttribute("download", "");
      }

      judgNumber = btn.textContent;
    });
  });

  function removeClass() {
    downloadedFile.forEach(function (btn) {
      btn.classList.remove("load");
    });
  }

  openFileBtn.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      e.preventDefault();

      if (e.target.classList.contains("print_btn")) {
        isPrint = true;
      } else {
        isPrint = false;
      }

      if (e.target.classList.contains("open_btn")) {
        isOpen = true;
      } else {
        isOpen = false;
      }

      openModal();
    });
  });

  function openModal() {
    fileModal.classList.add("file_modal_active");
    document.body.classList.add("body_lock");
    modalContainer.classList.add("active_container");

    if (isPrint || isOpen) {
      selectBtn.removeAttribute("download");
      selectBtn.removeAttribute("target");

      if (isOpen) {
        selectBtn.setAttribute("target", "_blank");
      }
    } else {
      selectBtn.setAttribute("download", "");
    }
  }

  function closeModal() {
    fileModal.classList.remove("file_modal_active");
    document.body.classList.remove("body_lock");
    modalContainer.classList.remove("active_container");
  }

  closeBtn.addEventListener("click", function () {
    closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && fileModal.classList.contains("file_modal_active")) {
      closeModal();
    }
  });
  fileModal.addEventListener("click", function (e) {
    if (e.target === fileModal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });
  selectBtn.addEventListener("click", function (e) {
    // if (isPrint) {
    //     e.preventDefault();
    //     printPage(e.target.getAttribute("href"));
    // }
    e.preventDefault();
    if (!judgNumber) judgNumber = "1";
    var payload = getPayload();
    spinner.show();
    fetchFile(payload).then(function (resp) {
      return resp.blob();
    }) //TODO: delete btn.getAttribute('href')
    .then(function (blob) {
      onActionFile(blob, "".concat(fileName, ".pdf"), selectBtn.getAttribute("href"));
      closeModal();
    }).finally(function () {
      spinner.hide();
    });
  });
}

function closePrint() {
  document.body.removeChild(this.__container__);
}

function setPrint() {
  this.contentWindow.__container__ = this;
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  this.contentWindow.focus();
  this.contentWindow.print();
}

function printPage(sURL) {
  var hideFrame = document.createElement("iframe");
  hideFrame.onload = setPrint;
  hideFrame.style.position = "fixed";
  hideFrame.style.right = "0";
  hideFrame.style.bottom = "0";
  hideFrame.style.width = "0";
  hideFrame.style.height = "0";
  hideFrame.style.border = "0";
  hideFrame.src = sURL;
  document.body.appendChild(hideFrame);
} // function openModalTab() {
//     const tabs = document.querySelectorAll(".tab_title");
//     if
//     const tabContent = document.querySelectorAll(".tab_body");
//     const closeTab = document.querySelectorAll(".close_item");
//     const tabBg = document.getElementById("tab_bg");
//     function showTab(i = 0) {
//         tabContent[i].classList.add("show_tab");
//         tabBg.classList.add("show_bg");
//         document.body.classList.add("faq_lock");
//     }
//     function closeTabModal() {
//         tabContent.classList.remove("show_tab");
//         tabBg.classList.remove("show_bg");
//         document.body.classList.remove("faq_lock");
//     }
//     closeTab.forEach((item, i) => {
//         item.addEventListener("click", () => {
//             tabContent[i].classList.remove("show_tab");
//             tabBg.classList.remove("show_bg");
//             document.body.classList.remove("faq_lock");
//         });
//     });
//     tabs.forEach((button, i) => {
//         button.addEventListener("click", () => {
//             showTab(i);
//         });
//     });
// }
// openModalTab();


function footerAccord() {
  var dropDown = document.querySelector(".dropdown_btn");

  if (!dropDown) {
    return;
  }

  var dropDownContent = document.querySelector(".dropdown-footer-content");
  dropDown.addEventListener("click", function (e) {
    e.preventDefault();
    dropDownContent.classList.toggle("dropdown-active");
    dropDown.classList.toggle("btn_active");
  });
}

footerAccord(); // HELPERS:

function setWithExpiry(key, value, ttl) {
  var now = new Date(); // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire

  var item = {
    value: value,
    expiry: now.getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  var itemStr = localStorage.getItem(key); // if the item doesn't exist, return null

  if (!itemStr) {
    return null;
  }

  var item = JSON.parse(itemStr);
  var now = new Date(); // compare the expiry time of the item with the current time

  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

function uniqueId() {
  return Math.floor(Math.random() * 8999999 + 1000000);
}

function toMilliseconds() {
  var hrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var sec = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return (hrs * 60 * 60 + min * 60 + sec) * 1000;
} // Example POST method implementation:


function postData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Default options are marked with *
  return fetch(url, {
    method: "POST",
    // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    // no-cors, *cors, same-origin
    cache: "no-cache",
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json" // 'Content-Type': 'application/x-www-form-urlencoded',

    },
    redirect: "follow",
    // manual, *follow, error
    referrerPolicy: "no-referrer",
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header

  });
}
//# sourceMappingURL=main.js.map
