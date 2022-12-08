// Swiper:

function destroySlidersOnResize(selector, width, obj, moreThan) {
    const init = {
      ...obj,
    };
  
    const win = window;
    const sliderSelector = document.querySelector(selector);
    let swiper = new Swiper(selector, init);
  
    const toggleInit = () => {
      const neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width
      if (neededWidth) {
        if (!sliderSelector.classList.contains("swiper-initialized")) {
          swiper = new Swiper(selector, init);
        }
      } else if (sliderSelector?.classList.contains("swiper-initialized")) {
        swiper.destroy();
      }
    };
  
    ["load", "resize"].forEach((evt) =>
      win.addEventListener(evt, toggleInit, false)
    );
}

destroySlidersOnResize(".me-slider", 960, {
    spaceBetween: 20,
  
    pagination: {
      el: ".swiper-pagination",
    },
});

initCustomSlider();

function initCustomSlider() {
  const form = document.querySelector("#investForm");
  const sliderWrap = document.querySelector(".invest-range");
  const htmlRange = sliderWrap.querySelector('input[type="range"]');
  const slider = form.querySelector("#slider");
  const result = form.querySelector("#sliderResult");

  const formatNumber = (number) => Number(number).toFixed();

  noUiSlider.create(slider, {
    start: 0,
    connect: true,
    range: {
      min: 0,
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