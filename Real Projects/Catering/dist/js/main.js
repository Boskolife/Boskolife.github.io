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
stickyMenu();
selectOption();

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
  var soundBtnSrc = document.querySelector(".soundBtnSrc");

  if (!video) {
    return;
  }

  var soundBtn = document.querySelector(".soundBtn");
  soundBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (video.hasAttribute("muted")) {
      video.removeAttribute("muted");
      video.muted = false;
      soundBtnSrc.src = "./images/home_page/btnUnmute.svg";
    } else {
      video.setAttribute("muted", "");
      video.muted = true;
      soundBtnSrc.src = "./images/home_page/btnMute.svg";
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
    col.classList.add("clicked");

    if (col.item) {
      col.item.classList.remove("meal_item_active");
    }

    col.item = item;
    col.item.classList.add("meal_item_active");
  }

  colsDishes.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var mealItem = e.target.closest(".meal_item");
      if (!mealItem) return;
      if (!item.contains(mealItem)) return;
      highlight(item, mealItem);
    });
  });
}

function stickyMenu() {
  var menuPage = document.querySelector(".menu_page");
  var footer = document.querySelector("#footer");

  if (!menuPage) {
    return;
  }

  var navLinks = gsap.utils.toArray(".menu_items .anchor");
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
    toggleClass: "active_scrollMenu",
    start: "top top-=0",
    endTrigger: "#footer",
    end: "".concat(footer.clientHeight / 2, " bottom"),
    pin: true,
    pinSpacing: false,
    scrub: 1,
    onLeave: function onLeave(self) {
      self.trigger.classList.add("active_scrollMenu_hide");
    },
    onEnterBack: function onEnterBack(self) {
      self.trigger.classList.remove("active_scrollMenu_hide");
    } // markers: true,

  });
  var panels = gsap.utils.toArray(".menu_positions");
  panels.forEach(function (panel, i) {
    ScrollTrigger.create({
      trigger: panel,
      start: "top 50%",
      onEnter: function onEnter() {
        navLinks.forEach(function (e) {
          e.closest(".item").classList.remove("active");
        });
        navLinks[i].closest(".item").classList.add("active");
      },
      onEnterBack: function onEnterBack() {
        navLinks.forEach(function (e) {
          e.closest(".item").classList.remove("active");
        });
        navLinks[i].closest(".item").classList.add("active");
      }
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
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;

        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
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
  var popupLogin = document.querySelector(".login_popup");
  var popupContainer = document.querySelector(".popup_container");
  var closeElement = document.querySelector(".closeElement");
  var loginBtn = document.querySelector(".login_btn");
  var popupBtn = document.querySelector(".popup_btn");
  loginBtn.addEventListener("click", function () {
    popupLogin.classList.add("active_popup");
    popupContainer.classList.add("popup_container_active");
    document.body.classList.add("popup_lock");
  });
  closeElement.addEventListener("click", function () {
    popupLogin.classList.remove("active_popup");
    popupContainer.classList.remove("popup_container_active");
    document.body.classList.remove("popup_lock");
  });
  popupBtn.addEventListener("click", function () {
    popupLogin.classList.remove("active_popup");
    popupContainer.classList.remove("popup_container_active");
    document.body.classList.remove("popup_lock");
  });
}

loginPopup();
//# sourceMappingURL=main.js.map
