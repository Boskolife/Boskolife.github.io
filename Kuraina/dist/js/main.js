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
    slideChangeTransitionStart: function slideChangeTransitionStart() {
      var activeSlide = this.slides[this.activeIndex];
      var textElements = document.querySelectorAll(".swiper-slide .text");
      textElements.forEach(function (textElement) {
        textElement.classList.remove("activeText");
      });
      var activeText = activeSlide.querySelectorAll(".text");
      activeText.forEach(function (itemText) {
        itemText.classList.add("activeText");
      }); // if ((this.activeIndex + 1) % 2 === 0) {
      //     slider.allowSlideNext = false;
      //     slider.allowSlidePrev = false;
      //     setTimeout(() => {
      //         slider.allowSlideNext = true;
      //         slider.allowSlidePrev = true;
      //     }, 5000);
      // }
    },
    slideNextTransitionStart: function slideNextTransitionStart(self) {
      var rotateElem = document.querySelector(".progress_img");
      var progress = self.progress * 100;
      rotateElem.style.transform = "\n            translateY(-50%) rotate(".concat(imageRotate += 360, "deg)\n            ");
    },
    slidePrevTransitionStart: function slidePrevTransitionStart(self) {
      var rotateElem = document.querySelector(".progress_img");
      var progress = self.progress * 100;
      rotateElem.style.transform = "\n            translateY(-50%) rotate(".concat(imageRotate -= 360, "deg)\n            ");
    }
  }
});
//# sourceMappingURL=main.js.map
