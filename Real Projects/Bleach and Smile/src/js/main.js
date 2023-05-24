ininSwiper();
initBurger();

function ininSwiper() {
    function destroySlidersOnResize(selector, width, obj, moreThan) {
        const init = {
            ...obj,
        };

        const win = window;
        const sliderSelector = document.querySelector(selector);
        if (!sliderSelector) {
            return;
        }
        let swiper = new Swiper(selector, init);

        const toggleInit = () => {
            const neededWidth = moreThan
                ? win.innerWidth >= width
                : win.innerWidth <= width;
            if (neededWidth) {
                if (!sliderSelector.classList.contains("swiper-initialized")) {
                    swiper = new Swiper(selector, init);
                }
            } else if (
                sliderSelector.classList.contains("swiper-initialized")
            ) {
                swiper.destroy();
            }
        };

        ["load", "resize"].forEach((evt) =>
            win.addEventListener(evt, toggleInit, false)
        );
    }

    destroySlidersOnResize(".reviews_swiper", 9999, {
        spaceBetween: 20,
        direction: "horizontal",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1024: {
                direction: "vertical",
            },
        },
    });
    destroySlidersOnResize(".contact_swiper", 9999, {
        spaceBetween: 20,
        direction: "horizontal",
        simulateTouch: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        breakpoints: {
            1024: {
                direction: "vertical",
            },
        },
    });
    destroySlidersOnResize(".post_swiper", 9999, {
        spaceBetween: 20,
        direction: "horizontal",
        simulateTouch: true,

        breakpoints: {
            1024: {
                direction: "vertical",
                pagination: {
                    el: ".swiper-pagination",
                },
            },
        },
    });
    destroySlidersOnResize(".categories_swiper", 9999, {
        spaceBetween: 10,
        slidesPerView:1.75,
        direction: "horizontal",
        simulateTouch: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        breakpoints: {
            1024: {
                slidesPerView:3,
            },
            768: {
                spaceBetween: 20,
                slidesPerView:2,
            },
        },
    });
}

function initBurger() {
    const burger = document.querySelector(".burger_wrap");
    const menu = document.querySelector(".nav");
    const menuContainer = document.querySelector(".menu_container");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        menu.classList.toggle("menu_active");
        menuContainer.classList.toggle("menu_container_active");
        document.body.classList.toggle("body_lock");
    });
}

var slider = new BeerSlider( document.getElementById( "beer-slider" ) );