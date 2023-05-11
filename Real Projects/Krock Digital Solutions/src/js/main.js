initBurger();
initSwiper();
horizontalScroll();

function initSwiper() {
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

    destroySlidersOnResize(".project_swiper", 9999, {
        spaceBetween: 20,
        autoHeight: true,
        direction: "horizontal",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        mousewheel: {
            releaseOnEdges: true,
        },
        breakpoints: {
            850: {
                direction: "vertical",
            },
        },
    });
    destroySlidersOnResize(".show_swiper", 9999, {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 20,
        autoHeight: true,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            768: {
                spaceBetween: 30,
            },
            480: {
                slidesPerView: 2.5,
            },
        },
    });
    destroySlidersOnResize(".service_swiper", 768, {
        slidesPerView: 1,
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
            },
        },
    });
}

function initBurger() {
    const burger = document.querySelector(".header_burger");
    const navMenu = document.querySelector(".nav");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        navMenu.classList.toggle("menu_active");
        document.body.classList.toggle("body_lock");
    });
}

function horizontalScroll() {
    let screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (screenWidth < 768) {
        return;
    }

    let slides = document.querySelectorAll(".fromRight");
    if (!slides) {
        return;
    }

    let action = gsap
        .timeline({
            scrollTrigger: {
                trigger: "#horizontal_scroll",
                pin: true,
                scrub: 0.3,
                start: "top top",
                end: "+=3000",
            },
        })
        .to(slides, {
            xPercent: -100,
            duration: 2,
            ease: "none",
            stagger: 3,
        })
        .to({}, { duration: 1 });
    // an empty tween to generate a pause at the end
}
