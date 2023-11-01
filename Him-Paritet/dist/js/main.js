"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

openCatalog(); // Burger

var burger = document.querySelector(".burger_menu");
var menuBody = document.querySelector(".nav");
var linkClose = document.querySelectorAll(".link-close");

if (burger) {
  burger.addEventListener("click", function () {
    document.body.classList.toggle("body_lock");
    burger.classList.toggle("burger_active");
    menuBody.classList.toggle("menu_active");
    var subMenu = document.querySelector(".menu-item_active");
    var arrowTabWrap = document.querySelector(".arrow_tab_wrap_active");
    var arrowOpen = document.querySelector(".arrow_open");
    if (subMenu) subMenu.classList.remove("menu-item_active");
    if (arrowTabWrap) arrowTabWrap.classList.remove("arrow_tab_wrap_active");
    if (arrowOpen) arrowOpen.classList.remove("arrow_open");
  });
}

function closeBurgerMenu() {
  document.body.classList.remove("body_lock");
  burger.classList.remove("burger_active");
  menuBody.classList.remove("menu_active");
  var subMenu = document.querySelector(".menu-item_active");
  var arrowTabWrap = document.querySelector(".arrow_tab_wrap_active");
  var arrowOpen = document.querySelector(".arrow_open");
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
} // Category btn


var category = document.querySelector(".category_btn");
var tabsBody = document.querySelector(".tabs__nav");
var tabClose = document.querySelectorAll(".tab-close");

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
} // Click arrow


window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {
    var targetElement = e.target;

    if (window.innerWidth < 768) {
      if (targetElement.classList.contains("arrow")) {
        targetElement.closest(".menu-item").classList.toggle("menu-item_active");
        targetElement.closest(".arrow_tab_wrap").classList.toggle("arrow_tab_wrap_active");
        targetElement.closest(".arrow").classList.toggle("arrow_open");
      }
    }
  }
}; //Tabs


var ItcTabs = /*#__PURE__*/function () {
  function ItcTabs(target, config) {
    var _this$_elTabs, _this$_elTabs2;

    _classCallCheck(this, ItcTabs);

    var defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs = typeof target === "string" ? document.querySelector(target) : target;
    this._elButtons = (_this$_elTabs = this._elTabs) === null || _this$_elTabs === void 0 ? void 0 : _this$_elTabs.querySelectorAll(".tabs__btn");
    this._navElButtons = document.querySelectorAll(".nav_tabs__btn");
    this._cardElButtons = document.querySelectorAll(".card_link");
    this._elPanes = (_this$_elTabs2 = this._elTabs) === null || _this$_elTabs2 === void 0 ? void 0 : _this$_elTabs2.querySelectorAll(".tabs__pane");
    this._eventShow = new Event("tab.itc.change");
    this._navigationElements = [this._navElButtons];
    if (this._elButtons) this._navigationElements.push(this._elButtons);
    if (this._cardElButtons) this._navigationElements.push(this._cardElButtons);

    this._init();

    this._events();
  }

  _createClass(ItcTabs, [{
    key: "_init",
    value: function _init() {
      if (this._elTabs) this._elTabs.setAttribute("role", "tablist");

      this._navigationElements.forEach(function (nav) {
        nav.forEach(function (el, index) {
          el.dataset.index = index;
          el.setAttribute("role", "tab");
        });
      });

      if (this._elPanes) {
        this._elPanes.forEach(function (tabContent, index) {
          var _tabContent$index;

          (_tabContent$index = tabContent[index]) === null || _tabContent$index === void 0 ? void 0 : _tabContent$index.setAttribute("role", "tabpanel");
        });
      }

      this.showByHash();
    }
  }, {
    key: "showByHash",
    value: function showByHash() {
      var _window$location$hash;

      var currentIndexFromUrl = (_window$location$hash = window.location.hash) === null || _window$location$hash === void 0 ? void 0 : _window$location$hash.replace(/#/, "");

      if (currentIndexFromUrl) {
        this.showByIndex(currentIndexFromUrl);
      }
    }
  }, {
    key: "show",
    value: function show(elLinkTarget) {
      var elPaneTarget = this._elPanes[elLinkTarget.dataset.index];

      var elLinkActive = this._elTabs.querySelector(".tabs__btn_active");

      var elPaneShow = this._elTabs.querySelector(".tabs__pane_show");

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
  }, {
    key: "showByIndex",
    value: function showByIndex(index) {
      var elLinkTarget = this._elButtons[+index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    }
  }, {
    key: "_events",
    value: function _events() {
      var _this = this;

      document.addEventListener("click", function (e) {
        var target = e.target.closest(".tabs__btn") || e.target.closest(".nav_tabs__btn") || e.target.closest(".card_link");

        if (target) {
          var isNavLinkFromHeader = target.closest("header");
          e.preventDefault();
          var index = target.classList.contains("card_link") ? +target.dataset.index + 1 : +target.dataset.index;

          if (isNavLinkFromHeader) {
            closeBurgerMenu();
          }

          var origin = window.location.origin;
          var path = window.location.pathname;

          if (path.includes("our_production")) {
            _this.show(target);
          }

          if (origin === "https://boskolife.github.io") {
            window.location.href = "".concat(origin, "/Real%20Projects/Him-Paritet/dist/our_production.html#").concat(index);
            return;
          }

          window.location.href = "/dist/our_production.html#".concat(index);
        }
      });
      window.addEventListener("locationchange", function () {
        _this.showByHash();
      });
    }
  }]);

  return ItcTabs;
}();

new ItcTabs(".tabs");

(function () {
  var oldPushState = history.pushState;

  history.pushState = function pushState() {
    var ret = oldPushState.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  };

  var oldReplaceState = history.replaceState;

  history.replaceState = function replaceState() {
    var ret = oldReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  };

  window.addEventListener("popstate", function () {
    window.dispatchEvent(new Event("locationchange"));
  });
})();

function openCatalog() {
  var catalogBtn = document.querySelector(".catalog_btn");
  var catalogList = document.querySelector(".sub-menu");
  var isOpen = false;
  catalogBtn.addEventListener("click", function (e) {
    if (isOpen) {
      catalogList.classList.remove("activeCatalog");
    } else {
      catalogList.classList.add("activeCatalog");
    }

    isOpen = !isOpen;
    e.stopPropagation();
  });
  document.addEventListener("click", function (event) {
    if (isOpen && event.target !== catalogList && event.target !== catalogBtn) {
      catalogList.classList.remove("activeCatalog");
      isOpen = false;
    }
  });
}
//# sourceMappingURL=main.js.map
