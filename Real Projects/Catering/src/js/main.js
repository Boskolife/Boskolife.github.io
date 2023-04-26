initBurger();
initTabs();
videoSound();
initSwiper();
selectPlan();
selectMeal();

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
    if (!video) {
        return;
    }
    const soundBtn = document.querySelector(".soundBtn");

    soundBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (video.hasAttribute("muted")) {
            video.removeAttribute("muted");
            video.muted = false;
        } else {
            video.setAttribute("muted", "");
            video.muted = true;
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
        if (col.item) {
            col.item.classList.remove("meal_item_active");
        }
        col.item = item;
        col.item.classList.add("meal_item_active");
    }

    colsDishes.forEach((item) => {
        item.addEventListener("click", (e) => {
            let mealItem = e.target.closest(".meal_item");
            console.log(e);
            if (!mealItem) return;
            if (!item.contains(mealItem)) return;
            highlight(item, mealItem);
        });
    });
}


stickyMenu();
function stickyMenu() {
    const navLinks = gsap.utils.toArray(".menu_items .anchor");
    if(!navLinks) {
        return
    }
    navLinks.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
          duration: 0,
          scrollTo: { y: btn.hash, offsetY: 0 }
        });
      });
    });
    
    ScrollTrigger.create({
      trigger: ".scrollMenu",
      toggleClass: 'active_scrollMenu',
      start: "top top-=0",
    //   endTrigger: ".scrollpanels-content",
      end: "9999999",
      pin: true,
      pinSpacing: false,
      scrub: 1
    });
    
    const panels = gsap.utils.toArray(".menu_positions");
    
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top 50%",
    
        onEnter: () => {
          navLinks.forEach((e) => {
            e.closest('.item').classList.remove("active");
          });
          navLinks[i].closest('.item').classList.add("active");
        },
        onEnterBack: () => {
          navLinks.forEach((e) => {
            e.closest('.item').classList.remove("active");
          });
          navLinks[i].closest('.item').classList.add("active");
        }
      });
    });
}
