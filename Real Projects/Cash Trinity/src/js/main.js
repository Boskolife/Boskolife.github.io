// Swiper:

function destroySlidersOnResize(selector, width, obj, moreThan) {
  const init = {
    ...obj,
  };

  const win = window;
  const sliderSelector = document.querySelector(selector);

  if (!sliderSelector) return;

  let swiper = new Swiper(selector, init);

  const toggleInit = () => {
    const neededWidth = moreThan
      ? win.innerWidth >= width
      : win.innerWidth <= width;
    if (neededWidth) {
      if (!sliderSelector.classList.contains("swiper-initialized")) {
        swiper = new Swiper(selector, init);
      }
    } else if (sliderSelector.classList.contains("swiper-initialized")) {
      swiper.destroy();
    }
  };

  ["load", "resize"].forEach((evt) =>
    win.addEventListener(evt, toggleInit, false)
  );
}

destroySlidersOnResize(".lending_slider", 9999, {
  spaceBetween: 20,
  sliderPerView: 1,
  direction: "horizontal",
  mousewheel: {
    sensitivity: 1,
  },

  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },

  breakpoints: {
    768: {
      direction: "vertical",
      autoHeght: true,
    },
  },
});

const burger = document.querySelector(".burger_menu");
const menuBody = document.querySelector(".nav");
const linkClose = document.querySelectorAll(".link-close");
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
  const form = document.querySelector("#investForm");
  if (!form) return;
  const sliderWrap = document.querySelector(".invest-range");
  const htmlRange = sliderWrap.querySelector('input[type="range"]');
  const slider = form.querySelector("#slider");
  const result = form.querySelector("#sliderResult");

  const formatNumber = (number) => Number(number).toFixed();

  noUiSlider.create(slider, {
    start: 5,
    connect: "lower",
    range: {
      min: 5,
      max: 2000,
    },
    tooltips: {
      to: (num) => `$ ${formatNumber(num)}`,
    },
  });

  slider.noUiSlider.on("update", (event) => {
    const value = event[0];
    htmlRange.value = value;
    result.textContent = `$ ${formatNumber(value)}`;
  });
}

function initHeader() {
  const header = document.querySelector("#header");
  const sections = [...document.querySelectorAll(".transparent-header")];

  if (!header || !sections) return;

  const sectionsPositions = sections.map((section) => {
    const sectionStartPos = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionEnd = sectionStartPos + sectionHeight;
    return {
      start: sectionStartPos,
      end: sectionEnd,
    };
  });

  document.addEventListener("scroll", () => {
    const currentScrollPosY = window.scrollY;

    const isHeaderOverlaySection = sectionsPositions.find(
      (pos) =>
        currentScrollPosY >= pos.start &&
        currentScrollPosY <= pos.end - header.offsetHeight
    );

    isHeaderOverlaySection
      ? header.classList.add("transparent")
      : header.classList.remove("transparent");
  });
}

function initChart() {
  const chartContainer = document.querySelector("#chart");

  if (!chartContainer) return;

  let chart;
  const onlyDigitsRgx = /^\d+$/;
  const MAX_YEARS = 50;
  const MIN_YEARS = 1;
  const investmentInput = document.querySelector("#investmentInput");
  const onceRadio = document.querySelector("#onceRadio");
  const weeklyRadio = document.querySelector("#weeklyRadio");
  const monthlyRadio = document.querySelector("#monthlyRadio");
  const annuallyRadio = document.querySelector("#annuallyRadio");
  let timeInvest = 1;
  const RATE = 13;
  const numberOfYearsInput = document.querySelector("#numberOfYearsInput");

  investmentInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      return;
    }
    draw();
  });

  numberOfYearsInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      return;
    }
  });

  numberOfYearsInput.addEventListener("blur", (event) => {
    const value = event.target.value;
    if (+value > MAX_YEARS) {
      event.target.value = MAX_YEARS;
    }
    if (+value < MIN_YEARS) {
      event.target.value = MIN_YEARS;
    }
    draw();
  });

  document.addEventListener("click", (event) => {
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
    const interest = new Array(+numberOfYearsInput.value + 1)
      .fill(0)
      .map((_, ind) => {
        const res =
          ((+investmentInput.value * +numberOfYearsInput.value * timeInvest) /
            RATE) *
          ind;

        return +res.toFixed();
      });

    // TODO: do we need two more?
    const savings = [];
    const pv = [];

    chart = new Highcharts.Chart({
      chart: {
        renderTo: "chart",
        type: "column",
        height: 400,
      },
      colors: [
        "#3772FF",
        "#4C7DF8",
        "#0146F5",
        "#BDF0F4",
        "#42BFC7",
        "#1F1247",
      ],
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      title: {
        text: null,
      },
      xAxis: {
        min: 1,
        title: {
          text: "Years",
          style: {
            color: "#777E90",
          },
        },
        // allowDecimals: false,
      },
      yAxis: {
        title: {
          text: "Balance",
          style: {
            color: "#777E90",
          },
        },
        // endOnTick: false,
      },
      plotOptions: {
        column: {
          stacking: "normal",
          borderRadius: 4,
          dataLabels: {
            enabled: false,
          },
        },
        series: {
          borderWidth: 0,
          shadow: false,
          groupPadding: 0.1,
          pointPadding: 0.05,
        },
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
        enabled: false,
      },
      series: [
        {
          name: "Interest",
          data: interest,
          stack: "original",
          legendIndex: 3,
        },
        {
          name: "Regular deposits",
          data: savings,
          stack: "original",
          legendIndex: 2,
        },
        {
          name: "Initial deposit",
          data: pv,
          stack: "original",
          legendIndex: 1,
        },
      ],
    });
  }
}
