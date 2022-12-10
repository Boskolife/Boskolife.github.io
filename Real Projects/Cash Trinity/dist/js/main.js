"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Swiper:
function destroySlidersOnResize(selector, width, obj, moreThan) {
  var init = _objectSpread({}, obj);

  var win = window;
  var sliderSelector = document.querySelector(selector);
  if (!sliderSelector) return;
  var swiper = new Swiper(selector, init);

  var toggleInit = function toggleInit() {
    var neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width;

    if (neededWidth) {
      if (!sliderSelector.classList.contains("swiper-initialized")) {
        swiper = new Swiper(selector, init);
      }
    } else if (sliderSelector.classList.contains("swiper-initialized")) {
      swiper.destroy();
    }
  };

  ["load", "resize"].forEach(function (evt) {
    return win.addEventListener(evt, toggleInit, false);
  });
}

destroySlidersOnResize(".lending_slider", 9999, {
  spaceBetween: 20,
  sliderPerView: 1,
  direction: "horizontal",
  mousewheel: {
    sensitivity: 1
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar"
  },
  breakpoints: {
    768: {
      direction: "vertical",
      autoHeght: true
    }
  }
});
var burger = document.querySelector(".burger_menu");
var menuBody = document.querySelector(".nav");
var linkClose = document.querySelectorAll(".link-close");

if (burger) {
  burger.addEventListener("click", function (e) {
    document.body.classList.toggle("body_lock");
    burger.classList.toggle("burger_active");
    menuBody.classList.toggle("menu_active");
  });
}

if (linkClose.length) {
  for (var i = 0; i < linkClose.length; ++i) {
    linkClose[i].addEventListener("click", function (e) {
      document.body.classList.remove("body_lock");
      burger.classList.remove("burger_active");
      menuBody.classList.remove("menu_active");
    });
  }
}

try {
  new CircleType(document.getElementById("simple_arc"));
} catch (err) {
  console.log("err: ", err);
}

initHeader();
initCustomSlider();
initChart();

function initCustomSlider() {
  var form = document.querySelector("#investForm");
  if (!form) return;
  var sliderWrap = document.querySelector(".invest-range");
  var htmlRange = sliderWrap.querySelector('input[type="range"]');
  var slider = form.querySelector("#slider");
  var result = form.querySelector("#sliderResult");

  var formatNumber = function formatNumber(number) {
    return Number(number).toFixed();
  };

  noUiSlider.create(slider, {
    start: 5,
    connect: "lower",
    range: {
      min: 5,
      max: 2000
    },
    tooltips: {
      to: function to(num) {
        return "$ ".concat(formatNumber(num));
      }
    }
  });
  slider.noUiSlider.on("update", function (event) {
    var value = event[0];
    htmlRange.value = value;
    result.textContent = "$ ".concat(formatNumber(value));
  });
}

function initHeader() {
  var header = document.querySelector("#header");

  var sections = _toConsumableArray(document.querySelectorAll(".transparent-header"));

  if (!header || !sections) return;
  var sectionsPositions = sections.map(function (section) {
    var sectionStartPos = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionEnd = sectionStartPos + sectionHeight;
    return {
      start: sectionStartPos,
      end: sectionEnd
    };
  });
  document.addEventListener("scroll", function () {
    var currentScrollPosY = window.scrollY;
    var isHeaderOverlaySection = sectionsPositions.find(function (pos) {
      return currentScrollPosY >= pos.start && currentScrollPosY <= pos.end - header.offsetHeight;
    });
    isHeaderOverlaySection ? header.classList.add("transparent") : header.classList.remove("transparent");
  });
}

function initChart() {
  var chartContainer = document.querySelector("#chart");
  if (!chartContainer) return;
  var chart;
  var onlyDigitsRgx = /^\d+$/;
  var MAX_YEARS = 50;
  var MIN_YEARS = 1;
  var investmentInput = document.querySelector("#investmentInput");
  var onceRadio = document.querySelector("#onceRadio");
  var weeklyRadio = document.querySelector("#weeklyRadio");
  var monthlyRadio = document.querySelector("#monthlyRadio");
  var annuallyRadio = document.querySelector("#annuallyRadio");
  var timeInvest = 1;
  var RATE = 13;
  var numberOfYearsInput = document.querySelector("#numberOfYearsInput");
  investmentInput.addEventListener("input", function (event) {
    var value = event.target.value;

    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      return;
    }

    draw();
  });
  numberOfYearsInput.addEventListener("input", function (event) {
    var value = event.target.value;

    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      return;
    }
  });
  numberOfYearsInput.addEventListener("blur", function (event) {
    var value = event.target.value;

    if (+value > MAX_YEARS) {
      event.target.value = MAX_YEARS;
    }

    if (+value < MIN_YEARS) {
      event.target.value = MIN_YEARS;
    }

    draw();
  });
  document.addEventListener("click", function (event) {
    // TODO: formula
    switch (event.target) {
      case onceRadio:
        timeInvest = 2;
        draw();
        break;

      case weeklyRadio:
        timeInvest = 2.5;
        draw();
        break;

      case monthlyRadio:
        timeInvest = 3;
        draw();
        break;

      case annuallyRadio:
        timeInvest = 4;
        draw();
        break;

      default:
        break;
    }
  });
  draw();

  function draw() {
    // TODO: formula
    var interest = new Array(+numberOfYearsInput.value + 1).fill(0).map(function (_, ind) {
      var res = +investmentInput.value * +numberOfYearsInput.value * timeInvest / RATE * ind;
      return +res.toFixed();
    }); // TODO: do we need two more?

    var savings = [];
    var pv = [];
    chart = new Highcharts.Chart({
      chart: {
        renderTo: "chart",
        type: "column",
        height: 400
      },
      colors: ["#3772FF", "#4C7DF8", "#0146F5", "#BDF0F4", "#42BFC7", "#1F1247"],
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: null
      },
      xAxis: {
        min: 1,
        title: {
          text: "Years",
          style: {
            color: "#777E90"
          }
        } // allowDecimals: false,

      },
      yAxis: {
        title: {
          text: "Balance",
          style: {
            color: "#777E90"
          }
        } // endOnTick: false,

      },
      plotOptions: {
        column: {
          stacking: "normal",
          borderRadius: 4,
          dataLabels: {
            enabled: false
          }
        },
        series: {
          borderWidth: 0,
          shadow: false,
          groupPadding: 0.1,
          pointPadding: 0.05
        }
      },
      // TODO: tooltip?
      // tooltip: {
      //   shared: true,
      //   useHTML: true,
      //   borderColor: "#42BFC7",
      //   formatter: function () {
      //     var s = this.x;
      //     if (s == 1) {
      //       s = "year";
      //     } else {
      //       s = "years";
      //     }
      //     return s;
      //   },
      // },
      tooltip: {
        enabled: false
      },
      series: [{
        name: "Interest",
        data: interest,
        stack: "original",
        legendIndex: 3
      }, {
        name: "Regular deposits",
        data: savings,
        stack: "original",
        legendIndex: 2
      }, {
        name: "Initial deposit",
        data: pv,
        stack: "original",
        legendIndex: 1
      }]
    });
  }
}
//# sourceMappingURL=main.js.map
