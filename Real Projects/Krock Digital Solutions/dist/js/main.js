"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

initBurger();
initSwiper(); // horizontalScroll();

function initSwiper() {
  var _destroySlidersOnResi, _destroySlidersOnResi2;

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

  destroySlidersOnResize(".project_swiper", 9999, {
    spaceBetween: 20,
    autoHeight: true,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    mousewheel: {
      releaseOnEdges: true
    },
    breakpoints: {
      850: {
        direction: "vertical"
      }
    }
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
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      768: {
        spaceBetween: 30
      },
      480: {
        slidesPerView: 2.5
      }
    }
  });
  destroySlidersOnResize(".service_swiper", 768, {
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      480: {
        slidesPerView: 2
      }
    }
  });
  destroySlidersOnResize(".case_swiper_one", 9999, (_destroySlidersOnResi = {
    slidesPerView: 2,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    loopedSlides: 3,
    autoplay: true,
    speed: 1000
  }, _defineProperty(_destroySlidersOnResi, "autoplay", {
    delay: 2000,
    pauseOnMouseEnter: true
  }), _defineProperty(_destroySlidersOnResi, "breakpoints", {
    768: {
      slidesPerView: 3.5,
      spaceBetween: 20
    }
  }), _destroySlidersOnResi));
  destroySlidersOnResize(".case_swiper_two", 9999, (_destroySlidersOnResi2 = {
    slidesPerView: 2,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    loopedSlides: 3,
    autoplay: true,
    speed: 1000
  }, _defineProperty(_destroySlidersOnResi2, "autoplay", {
    delay: 2000,
    pauseOnMouseEnter: true,
    reverseDirection: true
  }), _defineProperty(_destroySlidersOnResi2, "breakpoints", {
    768: {
      slidesPerView: 3.5,
      spaceBetween: 30
    }
  }), _destroySlidersOnResi2));
  destroySlidersOnResize(".post_swiper", 99999, {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      }
    }
  });
}

function initBurger() {
  var burger = document.querySelector(".header_burger");
  var navMenu = document.querySelector(".nav");
  burger.addEventListener("click", function () {
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
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth < 768) {
    return;
  }

  var slides = document.querySelectorAll(".fromRight");

  if (!slides) {
    return;
  }

  var action = gsap.timeline({
    scrollTrigger: {
      trigger: "#horizontal_scroll",
      pin: true,
      scrub: 0.3,
      start: "top top",
      end: "+=3000"
    }
  }).to(slides, {
    xPercent: -100,
    duration: 2,
    ease: "none",
    stagger: 3
  }).to({}, {
    duration: 1
  });
}

function openTabCase(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active_tab", "");
  }

  document.getElementById(tabName).style.display = "grid";
  evt.currentTarget.className += " active_tab";
}

function openTabBlog(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active_tab", "");
  }

  document.getElementById(tabName).style.display = "grid";
  evt.currentTarget.className += " active_tab";
}
//# sourceMappingURL=main.js.map
