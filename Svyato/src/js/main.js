new WOW().init();
initBurger();
anchorListener();
findHref();
imageFilter();

const logoSwiper = new Swiper(".logo_swiper", {
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

const landscapesSwiper = new Swiper(".landscapes_swiper", {
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

const landscapesPageSwiper = new Swiper(".landscapes_page_swiper", {
    direction: "vertical",
    spaceBetween: 30,
    speed: 1000,
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

Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

function imageFilter() {
    const list = document.querySelector(".filter_list");
    if(!list){
        return
    }
    const items = document.querySelectorAll(".gallery_item");
    const filterListItems = document.querySelectorAll(".filter_item");

    list.addEventListener("click", (e) => {
        const targetId = e.target.closest('.filter_item').dataset.id;
        const target = e.target;

        if (target.classList.contains("filter_item")) {
            filterListItems.forEach((listItem) => {
                listItem.classList.remove("activeFilter");
                target.classList.add("activeFilter");
            });
        }

        getItems(targetId === 'all' ? "gallery_item" : targetId);
    });

    function getItems(className) {
        items.forEach((item) => {
            if (item.classList.contains(className)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }
}
