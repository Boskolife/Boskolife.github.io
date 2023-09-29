initBurger();
replaceTextSeo();
initSwiper();
changeLabel();
setTimeout(initPopUp, 40000);
// horizontalScroll();
showTabList();
initTabs();
initHelpTabs();
initSeoTabs();
updateProgressPopup();
hideCardList();

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
    destroySlidersOnResize(".post_swiper", 99999, {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
        },
    });
    destroySlidersOnResize(".team_swiper", 99999, {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
        },
    });
    destroySlidersOnResize(".rewievs_swiper", 99999, {
        slidesPerView: 1,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

function initBurger() {
    const burger = document.querySelector(".header_burger");
    const navMenu = document.querySelector(".nav");
    const navContainer = document.querySelector(".nav_container");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        navMenu.classList.toggle("menu_active");
        document.body.classList.toggle("body_lock");
        navContainer.classList.toggle("active_container");
    });
}

function changeLabel() {
    let checkboxes = document.querySelectorAll(".looking_check");
    let labels = document.querySelectorAll(".looking_title");

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

function openTabFaq(evt, tabName) {
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

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active_tab";
}

function openCardSupportContent(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("card_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "flex";
    }

    tablinks = document.getElementsByClassName("supLink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
            " active_tab",
            ""
        );
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active_tab";
}

function initTabs() {
    const faqTabs = document.querySelector("#faqTabs");
    if (!faqTabs) return;

    const tabs = document.querySelectorAll(".tab_title"),
        tabsContent = document.querySelectorAll(".tab_content"),
        tabsParent = document.querySelectorAll(".tabcontent"),
        closeItem = document.querySelectorAll(".open_status");

    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle("show_content");
        tabs[i].classList.toggle("tab_active");
        closeItem[i].classList.toggle("open_active");
    }

    tabsParent.forEach((item) => {
        item.addEventListener("click", (event) => {
            const target = event.target;
            if (target && target.classList.contains("tab_title")) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        showTabContent(i);
                    }
                });
            }
        });
    });
}

function initHelpTabs() {
    const faqTabs = document.querySelector("#faqTabs");
    if (!faqTabs) return;

    const tabs = document.querySelectorAll(".tab_title"),
        tabsContent = document.querySelectorAll(".tab_content"),
        tabsParent = document.querySelectorAll(".card_tabcontent"),
        closeItem = document.querySelectorAll(".open_status");

    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle("show_content");
        tabs[i].classList.toggle("tab_active");
        closeItem[i].classList.toggle("open_active");
    }

    tabsParent.forEach((item) => {
        item.addEventListener("click", (event) => {
            const target = event.target;
            if (target && target.classList.contains("tab_title")) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        showTabContent(i);
                    }
                });
            }
        });
    });
}

function initSeoTabs() {
    const faqTabs = document.querySelector("#faqTabs");
    if (!faqTabs) {
        return;
    }

    const tabs = document.querySelectorAll(".tab_title"),
        tabsContent = document.querySelectorAll(".tab_content"),
        tabsParent = document.querySelectorAll(".seo_tabcontent"),
        closeItem = document.querySelectorAll(".open_status");
    console.log(tabsParent);
    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle("show_content");
        tabs[i].classList.toggle("tab_active");
        closeItem[i].classList.toggle("open_active");
    }

    tabsParent.forEach((item) => {
        item.addEventListener("click", (event) => {
            const target = event.target;

            if (target && target.classList.contains("tab_title")) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        showTabContent(i);
                    }
                });
            }
        });
    });
}

function initPopUp() {
    const popUp = document.querySelector(".popUp");
    if (!popUp) {
        return;
    }
    const popUpContainer = document.querySelector(".popUpContainer");
    const closeElement = document.querySelector(".close_element");

    popUpContainer.classList.add("activeContainer");
    popUp.classList.add("activePopUp");
    document.body.classList.add("popUp_lock");

    closeElement.addEventListener("click", () => {
        popUp.classList.remove("activePopUp");
        popUpContainer.classList.remove("activeContainer");
        document.body.classList.remove("popUp_lock");
    });
}

function updateProgressPopup() {
    const parent = document.querySelector(".brief .content");
    if (!parent) {
        return;
    }
    const nextBtn = document.getElementById("nextButton");
    const backBtn = document.getElementById("backButton");
    const sendBtn = document.getElementById("send");
    const numberSteps = document.querySelectorAll(".title_wrap");

    let currentStep = 0;
    let totalSteps = 4;
    const steps = new Array(totalSteps + 1).fill(0).map(() => {
        return {
            done: false,
        };
    });

    steps[currentStep].done = true;
    updateProgress();

    function updateProgress() {
        let progressBar = document.getElementById("progressBar");
        let progress = (currentStep / totalSteps) * 100;
        progressBar.value = progress;
        parent.classList.add(`step_${currentStep}`);
        steps.forEach((item, i) => {
            if (item.done) {
                numberSteps[i].classList.add("active");
            } else {
                numberSteps[i].classList.remove("active");
            }
            if (currentStep === i) {
                numberSteps[i]
                    .querySelector(".title")
                    .classList.add("title_active");
            } else {
                numberSteps[i]
                    .querySelector(".title")
                    .classList.remove("title_active");
            }
        });
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            parent.classList.remove(`step_${currentStep}`);
            currentStep++;
            steps[currentStep].done = true;
            updateProgress();
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            parent.classList.remove(`step_${currentStep}`);
            steps[currentStep].done = false;
            currentStep--;
            updateProgress();
        }
    }

    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        nextStep();
    });

    sendBtn.addEventListener("click", () => {
        nextStep();
    });

    backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        prevStep();
    });
}

function showTabList() {
    const openArrow = document.querySelector(".openList_arrow");
    if (!openArrow) return;
    const faqList = document.querySelector(".faq_list");

    openArrow.addEventListener("click", () => {
        openArrow.classList.toggle("activeArrow");
        faqList.classList.toggle("active_list");
    });
}

function hideCardList() {
    const cardBtn = document.querySelectorAll(".supLink");
    const backBtn = document.querySelectorAll(".back_btn");
    const cardListContent = document.querySelector(".help_content");
    const cardContent = document.querySelectorAll(".support_content");

    cardBtn.forEach((item) => {
        item.addEventListener("click", () => {
            cardListContent.style.display = "none";
        });
    });

    backBtn.forEach((item) => {
        item.addEventListener("click", () => {
            cardListContent.style.display = "grid";
            cardContent.forEach((item) => {
                item.style.display = "none";
            });
        });
    });
}

function replaceTextSeo() {
    const titleItems = document.querySelectorAll(".title_item");
    const textItems = document.querySelectorAll(".text_item");

    titleItems.forEach((title, index) => {
        title.addEventListener("click", () => {
            titleItems.forEach((item) => {
                item.classList.remove("activeTitle");
            });
            textItems.forEach((item) => {
                item.classList.remove("activeText");
            });

            title.classList.add("activeTitle");
            textItems[index].classList.add("activeText");
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
