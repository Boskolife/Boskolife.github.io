"use strict";

var winTriggersMethods = ["resize", "load"];
var MOBILE_SIZE = 480;
var prevWidth = window.innerWidth;
initTabs();
initBurger();
initNavBtn();
findHref();
renderDateSelects();
hideText();
calcPages();
jsonAnimation();
jsonCardAnimation();
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
      //   tabsWrap = document.querySelectorAll(".tab"),
  tabsContent = document.querySelectorAll(".tab_content"),
      tabsParent = document.querySelector(".tab_wrapper");

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.toggle("show");
    tabs[i].classList.toggle("tab_active"); // tabsWrap[i].classList.toggle("active_tabsWrap");
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
      header = document.querySelector("#header");
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
    fullYear = getInputDate();
    result = nyJudgmentInterest(+amountValue, fullYear);
    currentDate.textContent = result.formateDate;
    awardEl.textContent = "$".concat(Number.parseFloat(amountValue).toFixed(2));
    interestRateEl.textContent = "$".concat(result.interest.toFixed(2));
    totalEl.textContent = "$".concat(result.totalValue.toFixed(2));
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
    fullYear = getInputDate();
    result = nyJudgmentInterest(+amountValue, fullYear);
    currentDate.textContent = result.formateDate;
    awardEl.textContent = "$".concat(Number.parseFloat(amountValue).toFixed(2));
    interestRateEl.textContent = "$".concat(result.interest.toFixed(2));
    totalEl.textContent = "$".concat(result.totalValue.toFixed(2));
  });
  startOverBtn.addEventListener("click", function (e) {
    e.preventDefault();
    resetCalculator();
  });
  amountInput.addEventListener("input", function (e) {
    var targetValue = e.target.value.replace(/\$/g, "").trim();

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
    e.target.value = "$ ".concat(targetValue);
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
    year: "numeric"
  }).replace(/\//g, ".").split(".");
  var formateDate = "".concat(localDate[0] < 10 ? "0".concat(localDate[0]) : localDate[0], ".").concat(localDate[1] < 10 ? "0".concat(localDate[1]) : localDate[1], ".").concat(localDate[2]); // Calculate the number of months between the judgment date and April 30, 2022

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
        end: "top",
        scrub: 1 //   markers: true,

      }
    });
    gsap.fromTo(puzzleBottomLeft, {
      x: isMobile ? -150 : -500
    }, {
      x: 0,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top",
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
        end: "top",
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
        end: "top",
        scrub: 1 //   markers: true,

      }
    });
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
    gsap.to(rightSide, {
      x: isMobile ? 125 : 375
    });
    gsap.fromTo(rightSide, {
      x: isMobile ? 125 : 375
    }, {
      x: 0,
      scrollTrigger: {
        trigger: section,
        start: "50%+=".concat(headerHeight, " bottom"),
        end: "bottom",
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
    new Array(10).fill("icon").map(function (element, i) {
      return "".concat(element, "_").concat(i + 1);
    }).forEach(function (element) {
      var icon = document.getElementById(element);
      var iconBody = icon.closest('.anim_item');
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
      iconBody.addEventListener("mouseout", function () {
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
      cardBody.addEventListener("mouseout", function () {
        anim.stop();
      });
    });
  } catch (e) {
    console.log(e);
  }
}

function jsonAwardHover() {
  try {
    var award = document.getElementById("award_anim_electr");

    if (!award) {
      return;
    }

    var anim = bodymovin.loadAnimation({
      container: award,
      path: "files/scheme_hover_electr.json",
      render: "svg",
      loop: false,
      autoplay: false
    });
    award.addEventListener("mouseover", function () {
      anim.play();
    });
    award.addEventListener("mouseout", function () {
      anim.stop();
    });
  } catch (e) {
    console.log(e);
  }
}

jsonAwardHover();
//# sourceMappingURL=main.js.map
