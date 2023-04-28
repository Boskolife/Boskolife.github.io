initBurger();
initTabs();
videoSound();
initSwiper();
selectPlan();
selectMeal();
stickyMenu();
selectOption();

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

    destroySlidersOnResize(".contact_swiper", 9999, {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        effect: "cube",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

function initBurger() {
    const burger = document.querySelector(".burger_menu");
    const navMenu = document.querySelector(".nav");
    const navContainer = document.querySelector(".nav_container");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        navMenu.classList.toggle("menu_active");
        navContainer.classList.toggle("navContainer_active");
        document.body.classList.toggle("body_lock");
    });
}

function initTabs() {
    const faqTabs = document.querySelector("#faqTabs");

    if (!faqTabs) return;

    const tabs = document.querySelectorAll(".tab_title"),
        tabsContent = document.querySelectorAll(".tab_content"),
        tabsParent = document.querySelector(".tab_wrapper"),
        closeItem = document.querySelectorAll(".open_status");

    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle("show");
        tabs[i].classList.toggle("tab_active");
        closeItem[i].classList.toggle("open_active");
    }

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tab_title")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    showTabContent(i);
                }
            });
        }
    });
}

function videoSound() {
    const video = document.querySelector(".video");
    const soundBtnSrc = document.querySelector(".soundBtnSrc");
    if (!video) {
        return;
    }
    const soundBtn = document.querySelector(".soundBtn");

    soundBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (video.hasAttribute("muted")) {
            video.removeAttribute("muted");
            video.muted = false;
            soundBtnSrc.src = "./images/home_page/btnUnMute.svg";
        } else {
            video.setAttribute("muted", "");
            video.muted = true;
            soundBtnSrc.src = "./images/home_page/btnMute.svg";
        }
    });
}

function selectPlan() {
    const cardPlan = document.querySelectorAll(".cardPlan");
    const silverPlan = document.querySelector(".silver_plan");
    const goldPlan = document.querySelector(".gold_plan");
    const platinumPlan = document.querySelector(".platinum_plan");

    function removeActiveClass() {
        cardPlan.forEach((item) => {
            item.classList.remove("current_card");
        });
    }

    cardPlan.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            if (e.currentTarget.classList.contains("cardPlanSilver")) {
                silverPlan.style.display = "block";
                goldPlan.style.display = "none";
                platinumPlan.style.display = "none";
                removeActiveClass();
                item.classList.add("current_card");
            }
            if (e.currentTarget.classList.contains("cardPlanGold")) {
                silverPlan.style.display = "none";
                goldPlan.style.display = "block";
                platinumPlan.style.display = "none";
                removeActiveClass();
                item.classList.add("current_card");
            }
            if (e.currentTarget.classList.contains("cardPlanPlatinum")) {
                silverPlan.style.display = "none";
                goldPlan.style.display = "none";
                platinumPlan.style.display = "block";
                removeActiveClass();
                item.classList.add("current_card");
            }
        });
    });
}

function selectMeal() {
    const colsDishes = document.querySelectorAll(".meal_column");
    function highlight(col, item) {
        col.classList.add("clicked");
        if (col.item) {
            col.item.classList.remove("meal_item_active");
        }
        col.item = item;
        col.item.classList.add("meal_item_active");
    }

    colsDishes.forEach((item) => {
        item.addEventListener("click", (e) => {
            let mealItem = e.target.closest(".meal_item");
            if (!mealItem) return;
            if (!item.contains(mealItem)) return;
            highlight(item, mealItem);
        });
    });
}

function stickyMenu() {
    const menuPage = document.querySelector(".menu_page");
    const footer = document.querySelector("#footer");
    if (!menuPage) {
        return;
    }
    const navLinks = gsap.utils.toArray(".menu_items .anchor");
    navLinks.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 0,
                scrollTo: { y: btn.hash, offsetY: 0 },
            });
        });
    });

    ScrollTrigger.create({
        trigger: ".scrollMenu",
        toggleClass: "active_scrollMenu",
        start: "top top-=0",
        endTrigger: "#footer",
        end: `${footer.clientHeight / 2} bottom`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onLeave: (self) => {
            self.trigger.classList.add("active_scrollMenu_hide");
        },
        onEnterBack: (self) => {
            self.trigger.classList.remove("active_scrollMenu_hide");
        },
        // markers: true,
    });

    const panels = gsap.utils.toArray(".menu_positions");

    panels.forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            start: "top 50%",

            onEnter: () => {
                navLinks.forEach((e) => {
                    e.closest(".item").classList.remove("active");
                });
                navLinks[i].closest(".item").classList.add("active");
            },
            onEnterBack: () => {
                navLinks.forEach((e) => {
                    e.closest(".item").classList.remove("active");
                });
                navLinks[i].closest(".item").classList.add("active");
            },
        });
    });
}

function selectOption() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            /* For each option in the original select element,
    create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /* When an item is clicked, update the original select box,
        and the selected item: */
                var y, i, k, s, h, sl, yl;
                s =
                    this.parentNode.parentNode.getElementsByTagName(
                        "select"
                    )[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y =
                            this.parentNode.getElementsByClassName(
                                "same-as-selected"
                            );
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
  except the current select box: */
        var x,
            y,
            i,
            xl,
            yl,
            arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
}

function loginPopup() {
    const popupLogin = document.querySelector(".login_popup");
    const popupContainer = document.querySelector(".popup_container");
    const closeElement = document.querySelector(".closeElement");
    const loginBtn = document.querySelector(".login_btn");
    const popupBtn = document.querySelector(".popup_btn");

    loginBtn.addEventListener("click", () => {
        popupLogin.classList.add("active_popup");
        popupContainer.classList.add("popup_container_active");
        document.body.classList.add("popup_lock");
    });

    closeElement.addEventListener("click", () => {
        popupLogin.classList.remove("active_popup");
        popupContainer.classList.remove("popup_container_active");
        document.body.classList.remove("popup_lock");
    });

    popupBtn.addEventListener("click", () => {
        popupLogin.classList.remove("active_popup");
        popupContainer.classList.remove("popup_container_active");
        document.body.classList.remove("popup_lock");
    });
}

loginPopup();
