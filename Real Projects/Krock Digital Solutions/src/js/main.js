initBurger();
initSwiper();
// horizontalScroll();

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
        grabCursor: true,
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
    destroySlidersOnResize(".case_swiper_one", 9999, {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        autoplay: true,
        speed: 1000,
        autoplay: {
            delay: 2000,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3.5,
                spaceBetween: 20,
            },
        },
    });
    destroySlidersOnResize(".case_swiper_two", 9999, {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        autoplay: true,
        speed: 1000,
        autoplay: {
            delay: 2000,
            pauseOnMouseEnter: true,
            reverseDirection: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3.5,
                spaceBetween: 30,
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

changeLabel();
function changeLabel() {
    // let checkboxes = document.querySelectorAll(".looking_check");
    // checkboxes.forEach(function (checkbox) {
    //     checkbox.addEventListener("change", function () {
    //         let label = checkbox.previousElementSibling;
    //         if (checkbox.checked) {
    //             label.classList.add("label_checked");
    //         } else {
    //             label.classList.remove("label_checked");
    //         }
    //     });
    // });
    var checkboxes = document.querySelectorAll(".looking_check");
    var labels = document.querySelectorAll(".looking_title");

    checkboxes.forEach(function (checkbox, index) {
        checkbox.addEventListener("change", function () {
            
            if (checkbox.checked) {
                labels[index].classList.add("label_checked");
            } else {
                labels[index].classList.remove("label_checked");
            }

            checkboxes.forEach(function (otherCheckbox, otherIndex) {
                if (otherIndex !== index) {
                    labels[otherIndex].classList.remove("label_checked");
                }
            });

        });
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
}

function openTabCase(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
            " active_tab",
            ""
        );
    }

    document.getElementById(tabName).style.display = "grid";
    evt.currentTarget.className += " active_tab";
}

function openTabBlog(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
            " active_tab",
            ""
        );
    }

    document.getElementById(tabName).style.display = "grid";
    evt.currentTarget.className += " active_tab";
}
