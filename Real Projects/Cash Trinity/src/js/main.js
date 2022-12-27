initCurve();
initHeader();
initCustomSlider();
initChart();
initCircleBtn();
initBurgerMenu();
new WOW().init();
initPopUpApp();
initPopUpLogin();

destroySlidersOnResize(".lending_slider", 9999, {
  spaceBetween: 20,
  sliderPerView: 1,
  direction: "horizontal",
  mousewheel: {
    sensitivity: 1,
    releaseOnEdges:true,
  },
  autoHeight: true,
  speed:1000,

  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      direction: "vertical",
      autoHeght: true,
    },
  },
  
});

function initBurgerMenu() {
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
}

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

function initCurve() {
  const curveTextWrap = document.querySelector(".curve-text-wrap");
  const simple_arc1 = document.getElementById("simple_arc1");
  const simple_arc2 = document.getElementById("simple_arc2");
  const simple_arc3 = document.getElementById("simple_arc3");

  if (!simple_arc1 || !simple_arc2 || !simple_arc3) return;

  new CircleType(simple_arc1).radius(120);
  new CircleType(simple_arc2).radius(120);
  new CircleType(simple_arc3).radius(120);

  simple_arc1.classList.add("curve-text");
  simple_arc2.classList.add("curve-text");
  simple_arc3.classList.add("curve-text");
  curveTextWrap.classList.add("active");
}

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

function initCircleBtn() {
  const circleBtn = document.querySelector(".circle_btn");
  const firstSection = document.querySelectorAll("section")[0];
  const formSection = document.querySelector(".form");
  const footer = document.querySelector("footer");

  if (!circleBtn || !firstSection) return;

  checkStickyBtn();

  document.addEventListener("scroll", checkStickyBtn);
  window.addEventListener("resize", checkStickyBtn);

  function checkStickyBtn() {
    const firstSecHeight = firstSection.offsetHeight;
    const currentScrollPosY = window.scrollY;
    const firstSectionBottomPadding = getComputedStyle(
      firstSection
    ).paddingBottom.replace(/px/g, "");
    const currentScrollBottomPos = window.scrollY + window.innerHeight;

    currentScrollPosY > firstSecHeight - +firstSectionBottomPadding
      ? circleBtn.classList.add("sticky")
      : circleBtn.classList.remove("sticky");

    if (formSection) {
      const formSectionTopPos = formSection.offsetTop;

      currentScrollBottomPos >= formSectionTopPos
        ? circleBtn.classList.add("hidden")
        : circleBtn.classList.remove("hidden");
      return;
    }

    if (footer) {
      const footerTopPos = footer.offsetTop;
      const footerTopPadding = getComputedStyle(
        firstSection
      ).paddingTop.replace(/px/g, "");
      currentScrollBottomPos >= footerTopPos + +footerTopPadding / 2
        ? circleBtn.classList.add("hidden")
        : circleBtn.classList.remove("hidden");
    }
  }
}

function initHeader() {
  const header = document.querySelector("#header");
  const sections = [...document.querySelectorAll(".transparent-header")];

  if (!header || !sections) return;

  checkHeaderOverlay();

  document.addEventListener("scroll", checkHeaderOverlay);

  window.addEventListener("resize", checkHeaderOverlay);

  function checkHeaderOverlay() {
    const sectionsPositions = sections.map((section) => {
      const sectionStartPos = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionEnd = sectionStartPos + sectionHeight;
      return {
        start: sectionStartPos,
        end: sectionEnd,
      };
    });

    const currentScrollPosY = window.scrollY;

    if(currentScrollPosY < 0) return;

    const isHeaderOverlaySection = sectionsPositions.find(
      (pos) =>
        currentScrollPosY >= pos.start &&
        currentScrollPosY <= pos.end - header.offsetHeight
    );

    isHeaderOverlaySection
      ? header.classList.add("transparent")
      : header.classList.remove("transparent");
  }
}

function initChart() {
  const chartContainer = document.querySelector("#chart");

  if (!chartContainer) return;

  const onlyDigitsRgx = /^\d+$/;
  const MAX_YEARS = 50;
  const MIN_YEARS = 1;
  const investmentInput = document.querySelector("#investmentInput");
  investmentInput.value = `500$`;
  const onceRadio = document.querySelector("#onceRadio");
  const weeklyRadio = document.querySelector("#weeklyRadio");
  const monthlyRadio = document.querySelector("#monthlyRadio");
  const annuallyRadio = document.querySelector("#annuallyRadio");
  let timeInvest = 1;
  let isOnceChecked = true;
  let isAnnually = false;
  const RATE = 0.13;
  const numberOfYearsInput = document.querySelector("#numberOfYearsInput");
  numberOfYearsInput.value = `15 years`;
  const investedRes = document.querySelectorAll(".investedRes");
  const interestedRes = document.querySelectorAll(".interestedRes");
  const savingsRes = document.querySelectorAll(".savingsRes");

  let investmentInputValue = "500";
  let numberOfYearsInputValue = "15";

  const calcTotalInvested = (originalInvest, timeInvest) => {
    if (isOnceChecked) {
      return +originalInvest * +timeInvest;
    }
    if (!isAnnually) {
      return (
        +originalInvest * (+timeInvest * +numberOfYearsInputValue)
      );
    }
    return +originalInvest * +numberOfYearsInputValue;
  };

  investmentInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      investedRes.forEach((el) => (el.textContent = "$0"));
      return;
    }
    investmentInputValue = value;
    draw();
  });

  investmentInput.addEventListener("blur", (event) => {
    if (event.target.value.includes("$")) return;

    event.target.value = `${event.target.value || 500}$`;
  });

  investmentInput.addEventListener("click", () => {
    investmentInput.select();
  });

  numberOfYearsInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      return;
    }
  });

  numberOfYearsInput.addEventListener("click", () => {
    numberOfYearsInput.select();
  });

  numberOfYearsInput.addEventListener("blur", (event) => {
    const value = event.target.value || "15";

    if (value.includes("year")) return;

    if (+value > MAX_YEARS) {
      event.target.value = MAX_YEARS;
      numberOfYearsInputValue = MAX_YEARS;
    }
    if (+value < MIN_YEARS) {
      event.target.value = MIN_YEARS;
      numberOfYearsInputValue = MIN_YEARS;
    }
    numberOfYearsInputValue = event.target.value || value;
    event.target.value = `${numberOfYearsInputValue} ${
      +numberOfYearsInputValue > 1 ? "years" : "year"
    }`;

    draw();
  });

  document.addEventListener("click", (event) => {
    switch (event.target) {
      case onceRadio:
        timeInvest = 1;
        isOnceChecked = true;
        isAnnually = false;
        draw();
        break;
      case weeklyRadio:
        timeInvest = 52;
        isOnceChecked = false;
        isAnnually = false;
        draw();
        break;
      case monthlyRadio:
        timeInvest = 12;
        isOnceChecked = false;
        isAnnually = false;
        draw();
        break;
      case annuallyRadio:
        timeInvest = 1;
        isOnceChecked = false;
        isAnnually = true;
        draw();
        break;
      default:
        break;
    }
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const calculateFormula = (
    originalInvest,
    rate,
    numberOfTimes,
    numberOfYears
  ) => {
    const onceFormula =
      +originalInvest *
      Math.pow(1 + rate / numberOfTimes, numberOfTimes * numberOfYears);

    const res =
      numberOfTimes === 1 && isOnceChecked
        ? onceFormula
        : onceFormula +
          (+originalInvest *
            (Math.pow(1 + rate / numberOfTimes, numberOfTimes * numberOfYears) -
              1)) /
            (rate / numberOfTimes);
    return +res.toFixed();
  };

  draw();

  function draw() {
    const interest = new Array(+numberOfYearsInputValue + 1)
      .fill(0)
      .map((_, ind) => {
        if (!ind) return +investmentInputValue;
        return calculateFormula(investmentInputValue, RATE, timeInvest, ind);
      });

    investmentInputValue
      ? investedRes.forEach(
          (el) =>
            (el.textContent = formatter.format(
              calcTotalInvested(investmentInputValue, timeInvest)
            ))
        )
      : investedRes.forEach((el) => (el.textContent = "$0"));

    interest.length > 1
      ? savingsRes.forEach(
          (el) => (el.textContent = formatter.format(interest.at(-1)))
        )
      : savingsRes.forEach((el) => (el.textContent = "$0"));

    interest.length > 1
      ? interestedRes.forEach((el) => {
          const totalInvested = calcTotalInvested(
            investmentInputValue,
            timeInvest
          );
          const result = interest.at(-1) - +totalInvested;
          el.textContent = formatter.format(result);
        })
      : interestedRes.forEach((el) => (el.textContent = "$0"));

    new Highcharts.Chart({
      chart: {
        renderTo: "chart",
        type: "column",
        height: 365,
        backgroundColor: "#F8F9FB",
        spacing: [20, 20, 15, 10],
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
      },
      yAxis: {
        title: {
          text: "Balance",
          style: {
            color: "#777E90",
          },
        },
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
      ],
    });
  }
}

//Setting Active States on Sticky Navigations while Scrolling

var sections = $("section"),
  nav = $("nav"),
  nav_height = nav.outerHeight();

$(window).on("scroll", function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function () {
    var top = $(this).offset().top - nav_height,
      bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find("a").removeClass("active");
      sections.removeClass("active");

      $(this).addClass("active");
      nav
        .find('a[href="index.html#' + $(this).attr("id") + '"]')
        .addClass("active");

      $(this).addClass("active");
      nav
        .find('a[href="calculator.html#' + $(this).attr("id") + '"]')
        .addClass("active");
    }
  });
});

nav.find("a").on("click", function () {
  var $el = $(this),
    id = $el.attr("href");

  $("html, body").animate(
    {
      scrollTop: $(id).offset().top - nav_height,
    },
    500
  );

  return false;
});

function initPopUpLogin() {
  const openPopUp = document.getElementById("open_popup");
  const closePopUp = document.getElementById("close_popup");
  const popUp = document.getElementById("popup");
  const linkClose = document.querySelectorAll(".link-close");

  if (openPopUp) {
    openPopUp.addEventListener("click", function (e) {
      document.body.classList.toggle("body_lock_app");
    });
  }

  if (closePopUp) {
    closePopUp.addEventListener("click", function (e) {
      document.body.classList.remove("body_lock_app");
    });
  }
  openPopUp.addEventListener("click", function (e) {
    e.preventDefault();
    popUp.classList.add("active_popup");
  });

  closePopUp.addEventListener("click", () => {
    popUp.classList.remove("active_popup");
  });

  if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
      linkClose[i].addEventListener("click", function (e) {
        document.body.classList.remove("body_lock_app");
        popUp.classList.remove("active_popup");
      });
    }
  }
}

function initPopUpApp() {
  const openPopUp_app = document.getElementById("open_popup_app");
  const closePopUp_app = document.getElementById("close_popup_app");
  const popUp_app = document.getElementById("popup_app");
  const linkClose = document.querySelectorAll(".link-close");

  if (!openPopUp_app) return;
  
  if (openPopUp_app) {
    openPopUp_app.addEventListener("click", function (e) {
      document.body.classList.toggle("body_lock_app");
    });
  }
  
  if (closePopUp_app) {
    closePopUp_app.addEventListener("click", function (e) {
      document.body.classList.remove("body_lock_app");
    });
  }

  openPopUp_app?.addEventListener("click", function (e) {
    e.preventDefault();
    popUp_app.classList.add("active_popup_app");
  });
  
  closePopUp_app?.addEventListener("click", () => {
    popUp_app.classList.remove("active_popup_app");
  });

  if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
      linkClose[i].addEventListener("click", function (e) {
        document.body.classList.remove("body_lock_app");
        popUp_app.classList.remove("active_popup");
      });
    }
  }
}



const Confettiful = function(el) {
  this.el = el;
  this.containerEl = null;
  
  this.confettiFrequency = 3;
  this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E','#EFFF1D'];
  this.confettiAnimations = ['slow', 'medium', 'fast'];
  
  this._setupElements();
  this._renderConfetti();
};

Confettiful.prototype._setupElements = function() {
  const containerEl = document.createElement('div');
  const elPosition = this.el.style.position;
  
  if (elPosition !== 'relative' || elPosition !== 'absolute') {
    this.el.style.position = 'relative';
  }
  
  containerEl.classList.add('confetti-container');
  
  this.el.appendChild(containerEl);
  
  this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function() {
  this.confettiInterval = setInterval(() => {
    const confettiEl = document.createElement('div');
    const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
    const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
    const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
    const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
    
    confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;
    
    confettiEl.removeTimeout = setTimeout(function() {
      confettiEl.parentNode.removeChild(confettiEl);
    }, 3000);
    
    this.containerEl.appendChild(confettiEl);
  }, 25);
};

window.confettiful = new Confettiful(document.querySelector('.accept'));



