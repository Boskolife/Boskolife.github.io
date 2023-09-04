// Swiper:

function destroySlidersOnResize(selector, width, obj, moreThan) {
    const init = {
        ...obj,
    };

    const win = window;
    const sliderSelector = document.querySelector(selector);
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

destroySlidersOnResize(".main_swiper", 9999, {
    speed: 1500,
    mousewheel: true,
    slidesPerView:1,
    effect: "creative",
    creativeEffect: {
        prev: {
            opacity: 0,
        },
        next: {
            opacity: 0,
        },
    },
    breakpoints: {
      320:{
        autoHeight:true,
      },
      1024:{
        autoHeight:false,
      },
    }
});
