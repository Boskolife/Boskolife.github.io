initBurger();
anchorListener();
findHref();
initSwiper();

function initSwiper() {
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

    destroySlidersOnResize(".logo_swiper", 9999, {
        slidesPerView: 5.5,
        spaceBetween: 30,
        speed: 2000,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2.5,
            },
            768: {
                slidesPerView: 3.5,
            },
            1024: {
                slidesPerView: 5.5,
            },
        },
    });

    destroySlidersOnResize(".landscapes_swiper", 9999, {
        slidesPerView: "auto",
        speed: 2000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoHeight: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        breakpoints: {
            320: {
                spaceBetween: 10,
            },
            1024: {
                spaceBetween: 30,
            },
        },
    });

    destroySlidersOnResize(".landscapes_page_swiper", 9999, {
        direction: "vertical",
        spaceBetween: 30,
        speed: 2000,
        mousewheel: {
            releaseOnEdges: true,
        },
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
}

function initBurger() {
    const menu = document.querySelector(".nav");
    const burger = document.querySelector(".header_burger");
    const menuItems = document.querySelectorAll(".menu_item");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        menu.classList.toggle("menu_active");
        document.body.classList.toggle("body_lock");
    });

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            burger.classList.remove("burger_active");
            menu.classList.remove("menu_active");
            document.body.classList.remove("body_lock");
        });
    });
}

function anchorListener() {
    let screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (screenWidth > 1024) {
        return;
    }
    const targetElements = document.querySelectorAll(".hoverCard");
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1,
    };

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("orangeHover");
            } else {
                entry.target.classList.remove("orangeHover");
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    targetElements.forEach((targetElement) => {
        observer.observe(targetElement);
    });
}

function findHref() {
    let element = document.getElementById("menu").getElementsByTagName("a");
    let url = window.location.href;
    for (let i = 0; i < element.length; i++) {
        if (url === element[i].href) {
            element[i].classList.add("item_active");
        }
    }
}
