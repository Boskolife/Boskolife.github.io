"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

initBurger();
initTabs();
videoSound();
initSwiper();
selectPlan();
selectMeal();

function initSwiper() {
  function destroySlidersOnResize(selector, width, obj, moreThan) {
    var init = _objectSpread({}, obj);

    var win = window;
    var sliderSelector = document.querySelector(selector);

    if (!sliderSelector) {
      return;
    }

    var swiper = new Swiper(selector, init);

    var toggleInit = function toggleInit() {
      var neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width;

      if (neededWidth) {
        if (!sliderSelector.classList.contains("swiper-initialized")) {
          swiper = new Swiper(selector, init);
        }
      } else if (sliderSelector.classList.contains("swiper-initialized")) {
        swiper.destroy();
      }
    };

    ["load", "resize"].forEach(function (evt) {
      return win.addEventListener(evt, toggleInit, false);
    });
  }

  destroySlidersOnResize(".contact_swiper", 9999, {
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    effect: "cube",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

function initBurger() {
  var burger = document.querySelector(".burger_menu");
  var navMenu = document.querySelector(".nav");
  var navContainer = document.querySelector(".nav_container");
  burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    navMenu.classList.toggle("menu_active");
    navContainer.classList.toggle("navContainer_active");
    document.body.classList.toggle("body_lock");
  });
}

function initTabs() {
  var faqTabs = document.querySelector("#faqTabs");
  if (!faqTabs) return;
  var tabs = document.querySelectorAll(".tab_title"),
      tabsContent = document.querySelectorAll(".tab_content"),
      tabsParent = document.querySelector(".tab_wrapper"),
      closeItem = document.querySelectorAll(".open_status");

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.toggle("show");
    tabs[i].classList.toggle("tab_active");
    closeItem[i].classList.toggle("open_active");
  }

  tabsParent.addEventListener("click", function (event) {
    var target = event.target;

    if (target && target.classList.contains("tab_title")) {
      tabs.forEach(function (item, i) {
        if (target == item) {
          showTabContent(i);
        }
      });
    }
  });
}

function videoSound() {
  var video = document.querySelector(".video");

  if (!video) {
    return;
  }

  var soundBtn = document.querySelector(".soundBtn");
  soundBtn.addEventListener("click", function (e) {
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
  var cardPlan = document.querySelectorAll(".cardPlan");
  var silverPlan = document.querySelector(".silver_plan");
  var goldPlan = document.querySelector(".gold_plan");
  var platinumPlan = document.querySelector(".platinum_plan");

  function removeActiveClass() {
    cardPlan.forEach(function (item) {
      item.classList.remove("current_card");
    });
  }

  cardPlan.forEach(function (item, i) {
    item.addEventListener("click", function (e) {
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
  var colsDishes = document.querySelectorAll(".meal_column");

  function highlight(col, item) {
    if (col.item) {
      col.item.classList.remove("meal_item_active");
    }

    col.item = item;
    col.item.classList.add("meal_item_active");
  }

  colsDishes.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var mealItem = e.target.closest(".meal_item");
      console.log(e);
      if (!mealItem) return;
      if (!item.contains(mealItem)) return;
      highlight(item, mealItem);
    });
  });
}

stickyMenu();

function stickyMenu() {
  var navLinks = gsap.utils.toArray(".menu_items .anchor");

  if (!navLinks) {
    return;
  }

  navLinks.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      gsap.to(window, {
        duration: 0,
        scrollTo: {
          y: btn.hash,
          offsetY: 0
        }
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
  var panels = gsap.utils.toArray(".menu_positions");
  panels.forEach(function (panel, i) {
    ScrollTrigger.create({
      trigger: panel,
      start: "top 50%",
      onEnter: function onEnter() {
        navLinks.forEach(function (e) {
          e.closest('.item').classList.remove("active");
        });
        navLinks[i].closest('.item').classList.add("active");
      },
      onEnterBack: function onEnterBack() {
        navLinks.forEach(function (e) {
          e.closest('.item').classList.remove("active");
        });
        navLinks[i].closest('.item').classList.add("active");
      }
    });
  });
}
//# sourceMappingURL=main.js.map
