
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
      } else if (sliderSelector.classList.contains("swiper-initialized")) {
        swiper.destroy();
      }
    };
  
    ["load", "resize"].forEach((evt) =>
      win.addEventListener(evt, toggleInit, false)
    );
}

destroySlidersOnResize(".service_swiper", 9999, {
    slidesPerView: 1,
    slidesPerGroup:1,
    speed:850,

   

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    effect: 'creative',

    creativeEffect: {
      prev: {
        translate: [-400, 150, 0],
        rotate: [0, 0, -90],
        opacity: 0,
        origin: 'bottom center'
      }, 
      next: {
        translate: [400, 150, 0],
        rotate: [0, 0, 90],
        opacity: 0,
        origin: 'bottom center'
      },
    },
});
  
new WOW().init();

main_arrow();

function main_arrow() {
  const circleBtn = document.querySelector(".main_arrow");
  const footer = document.querySelector("footer");

  checkStickyBtn();

  document.addEventListener("scroll", checkStickyBtn);
  window.addEventListener("resize", checkStickyBtn);

  function checkStickyBtn() {
    const currentScrollBottomPos = window.scrollY + window.innerHeight;

    if (footer) {
      const footerTopPos = footer.offsetTop;
      const footerTopPadding = getComputedStyle(
        footer
      ).paddingTop.replace(/px/g, "");
      currentScrollBottomPos >= footerTopPos + +footerTopPadding / 2
        ? circleBtn.classList.add("hidden")
        : circleBtn.classList.remove("hidden");
    }
  }
}