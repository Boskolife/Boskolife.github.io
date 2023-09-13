"use strict";

// Swiper:
var imageRotate = 0;
var slider = new Swiper(".main_swiper", {
  speed: 1400,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  effect: "creative",
  creativeEffect: {
    prev: {
      opacity: 0
    },
    next: {
      opacity: 0
    }
  },
  breakpoints: {
    320: {
      autoHeight: true
    },
    1024: {
      autoHeight: false
    }
  },
  on: {
    slideChange: function slideChange(self) {
      var sideWrap = document.querySelector(".progressBar");
      var logo = document.getElementById("logo");
      var progressBar = document.getElementById("progressBar");
      var rotateElem = document.querySelector(".progress_img");
      var progress = self.progress * (100 - 9.5);
      sideWrap.style.left = "".concat(progress, "%");

      if (self.activeIndex > 0) {
        logo.style.opacity = "0";
      } else {
        logo.style.opacity = "1";
      }
    },
    slideNextTransitionStart: function slideNextTransitionStart(self) {
      var rotateElem = document.querySelector(".progress_img");
      var progress = self.progress * 100;
      rotateElem.style.transform = "\n            translateY(-50%) rotate(".concat(imageRotate += 45, "deg)\n            ");
    },
    slidePrevTransitionStart: function slidePrevTransitionStart(self) {
      var rotateElem = document.querySelector(".progress_img");
      var progress = self.progress * 100;
      rotateElem.style.transform = "\n            translateY(-50%) rotate(".concat(imageRotate -= 45, "deg)\n            ");
    }
  }
});
//# sourceMappingURL=main.js.map
