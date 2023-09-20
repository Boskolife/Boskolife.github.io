// Burger
const burger = document.querySelector(".burger_menu");
const menuBody = document.querySelector(".nav");
const linkClose = document.querySelectorAll(".link-close");

if (burger) {
  burger.addEventListener("click", () => {
    document.body.classList.toggle("body_lock");
    burger.classList.toggle("burger_active");
    menuBody.classList.toggle("menu_active");
    const subMenu = document.querySelector(".menu-item_active");
    const arrowTabWrap = document.querySelector(".arrow_tab_wrap_active");
    const arrowOpen = document.querySelector(".arrow_open");
    if (subMenu) subMenu.classList.remove("menu-item_active");
    if (arrowTabWrap) arrowTabWrap.classList.remove("arrow_tab_wrap_active");
    if (arrowOpen) arrowOpen.classList.remove("arrow_open");
  });
}

function closeBurgerMenu() {
  document.body.classList.remove("body_lock");
  burger.classList.remove("burger_active");
  menuBody.classList.remove("menu_active");
  const subMenu = document.querySelector(".menu-item_active");
  const arrowTabWrap = document.querySelector(".arrow_tab_wrap_active");
  const arrowOpen = document.querySelector(".arrow_open");
  if (subMenu) subMenu.classList.remove("menu-item_active");
  if (arrowTabWrap) arrowTabWrap.classList.remove("arrow_tab_wrap_active");
  if (arrowOpen) arrowOpen.classList.remove("arrow_open");
}

if (linkClose.length) {
  for (var i = 0; i < linkClose.length; ++i) {
    linkClose[i].addEventListener("click", function (e) {
      document.body.classList.remove("body_lock");
      burger.classList.remove("burger_active");
      menuBody.classList.remove("menu_active");
    });
  }
}

// Category btn
const category = document.querySelector(".category_btn");
const tabsBody = document.querySelector(".tabs__nav");
const tabClose = document.querySelectorAll(".tab-close");

if (category) {
  category.addEventListener("click", function (e) {
    document.body.classList.add("body_lock");
    category.classList.add("category_btn_active");
    tabsBody.classList.add("tabs__nav_active");
  });
}

if (tabClose.length) {
  for (var i = 0; i < tabClose.length; ++i) {
    tabClose[i].addEventListener("click", function (e) {
      document.body.classList.remove("body_lock");
      category.classList.remove("category_btn_active");
      tabsBody.classList.remove("tabs__nav_active");
    });
  }
}

// Click arrow

window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {
    const targetElement = e.target;
    if (window.innerWidth < 768) {
      if (targetElement.classList.contains("arrow")) {
        targetElement
          .closest(".menu-item")
          .classList.toggle("menu-item_active");
        targetElement
          .closest(".arrow_tab_wrap")
          .classList.toggle("arrow_tab_wrap_active");
        targetElement.closest(".arrow").classList.toggle("arrow_open");
      }
    }
  }
};

//Tabs

class ItcTabs {
  constructor(target, config) {
    const defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs =
      typeof target === "string" ? document.querySelector(target) : target;
    this._elButtons = this._elTabs?.querySelectorAll(".tabs__btn");
    this._navElButtons = document.querySelectorAll(".nav_tabs__btn");
    this._cardElButtons = document.querySelectorAll(".card_link");
    this._elPanes = this._elTabs?.querySelectorAll(".tabs__pane");
    this._eventShow = new Event("tab.itc.change");
    this._navigationElements = [this._navElButtons];
    if (this._elButtons) this._navigationElements.push(this._elButtons);
    if (this._cardElButtons) this._navigationElements.push(this._cardElButtons);
    this._init();
    this._events();
  }
  _init() {
    if (this._elTabs) this._elTabs.setAttribute("role", "tablist");
    this._navigationElements.forEach((nav) => {
      nav.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute("role", "tab");
      });
    });
    if (this._elPanes) {
      this._elPanes.forEach((tabContent, index) => {
        tabContent[index]?.setAttribute("role", "tabpanel");
      });
    }
    this.showByHash();
  }
  showByHash() {
    const currentIndexFromUrl = window.location.hash?.replace(/#/, "");
    if (currentIndexFromUrl) {
      this.showByIndex(currentIndexFromUrl);
    }
  }
  show(elLinkTarget) {
    const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
    const elLinkActive = this._elTabs.querySelector(".tabs__btn_active");
    const elPaneShow = this._elTabs.querySelector(".tabs__pane_show");
    if (elLinkTarget === elLinkActive) {
      return;
    }
    elLinkActive ? elLinkActive.classList.remove("tabs__btn_active") : null;
    elPaneShow ? elPaneShow.classList.remove("tabs__pane_show") : null;
    elLinkTarget.classList.add("tabs__btn_active");
    elPaneTarget.classList.add("tabs__pane_show");
    this._elTabs.dispatchEvent(this._eventShow);
    elLinkTarget.focus();
  }
  showByIndex(index) {
    const elLinkTarget = this._elButtons[+index];
    elLinkTarget ? this.show(elLinkTarget) : null;
  }
  _events() {
    document.addEventListener("click", (e) => {
      const target =
        e.target.closest(".tabs__btn") ||
        e.target.closest(".nav_tabs__btn") ||
        e.target.closest(".card_link");
      if (target) {
        const isNavLinkFromHeader = target.closest("header");
        e.preventDefault();
        const index = target.classList.contains("card_link")
          ? +target.dataset.index + 1
          : +target.dataset.index;
        if (isNavLinkFromHeader) {
          closeBurgerMenu();
        }
        const origin = window.location.origin;
        const path = window.location.pathname;
        if (path.includes("our_production")) {
          this.show(target);
        }
        if (origin === "https://boskolife.github.io") {
          window.location.href = `${origin}/Real%20Projects/Him-Paritet/dist/our_production.html#${index}`;
          return;
        }
        window.location.href = `/dist/our_production.html#${index}`;
      }
    });

    window.addEventListener("locationchange", () => {
      this.showByHash();
    });
  }
}

new ItcTabs(".tabs");

(() => {
  let oldPushState = history.pushState;
  history.pushState = function pushState() {
    let ret = oldPushState.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  };

  let oldReplaceState = history.replaceState;
  history.replaceState = function replaceState() {
    let ret = oldReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  };

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("locationchange"));
  });
})();
