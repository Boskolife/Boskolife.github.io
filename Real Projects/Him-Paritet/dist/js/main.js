"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Swiper:
function destroySlidersOnResize(selector, width, obj, moreThan) {
  var init = _objectSpread({}, obj);

  var win = window;
  var sliderSelector = document.querySelector(selector);
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

destroySlidersOnResize(".me-slider", 960, {
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination"
  }
});
var burger = document.querySelector(".burger_menu");
var menuBody = document.querySelector(".nav");
var linkClose = document.querySelectorAll(".link-close");

if (burger) {
  burger.addEventListener("click", function (e) {
    document.body.classList.toggle("body_lock");
    burger.classList.toggle("burger_active");
    menuBody.classList.toggle("menu_active");
  });
}

;

if (linkClose.length) {
  for (var i = 0; i < linkClose.length; ++i) {
    linkClose[i].addEventListener("click", function (e) {
      document.body.classList.remove("body_lock");
      burger.classList.remove("burger_active");
      menuBody.classList.remove("menu_active");
    });
  }
}

;

window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {
    var targetElement = e.target;

    if (window.innerWidth < 768) {
      if (targetElement.classList.contains('arrow')) {
        targetElement.closest('.menu-item').classList.toggle('menu-item_active');
      }
    }
  }
}; //Tabs


var ItcTabs = /*#__PURE__*/function () {
  function ItcTabs(target, config) {
    _classCallCheck(this, ItcTabs);

    var defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
    this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
    this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
    this._eventShow = new Event('tab.itc.change');

    this._init();

    this._events();
  }

  _createClass(ItcTabs, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._elTabs.setAttribute('role', 'tablist');

      this._elButtons.forEach(function (el, index) {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');

        _this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
  }, {
    key: "show",
    value: function show(elLinkTarget) {
      var elPaneTarget = this._elPanes[elLinkTarget.dataset.index];

      var elLinkActive = this._elTabs.querySelector('.tabs__btn_active');

      var elPaneShow = this._elTabs.querySelector('.tabs__pane_show');

      if (elLinkTarget === elLinkActive) {
        return;
      }

      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');

      this._elTabs.dispatchEvent(this._eventShow);

      elLinkTarget.focus();
    }
  }, {
    key: "showByIndex",
    value: function showByIndex(index) {
      var elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    }
  }, {
    key: "_events",
    value: function _events() {
      var _this2 = this;

      this._elTabs.addEventListener('click', function (e) {
        var target = e.target.closest('.tabs__btn');

        if (target) {
          e.preventDefault();

          _this2.show(target);
        }
      });
    }
  }]);

  return ItcTabs;
}();

new ItcTabs('.tabs');
//# sourceMappingURL=main.js.map
