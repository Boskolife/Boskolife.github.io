"use strict";

// // Swiper:
// function destroySlidersOnResize(selector, width, obj, moreThan) {
//     const init = {
//       ...obj,
//     };
//     const win = window;
//     const sliderSelector = document.querySelector(selector);
//     let swiper = new Swiper(selector, init);
//     const toggleInit = () => {
//       const neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width
//       if (neededWidth) {
//         if (!sliderSelector.classList.contains("swiper-initialized")) {
//           swiper = new Swiper(selector, init);
//         }
//       } else if (sliderSelector.classList.contains("swiper-initialized")) {
//         swiper.destroy();
//       }
//     };
//     ["load", "resize"].forEach((evt) =>
//       win.addEventListener(evt, toggleInit, false)
//     );
// }
// destroySlidersOnResize(".me-slider", 960, {
//     spaceBetween: 20,
//     pagination: {
//       el: ".swiper-pagination",
//     },
// });
initBurger();
findHref();
initContactPopup();

function initBurger() {
  var btnBurger = document.querySelector(".header_burger");

  if (!btnBurger) {
    return;
  }

  var menuBurger = document.querySelector(".nav");
  document.addEventListener("click", function (event) {
    if (btnBurger.contains(event.target)) {
      menuBurger.classList.toggle("nav_active");
      btnBurger.classList.toggle("burger_active");
      document.body.classList.toggle("body_lock");
      return;
    }

    if (!menuBurger.contains(event.target)) {
      menuBurger.classList.remove("nav_active");
      btnBurger.classList.remove("burger_active");
      document.body.classList.remove("body_lock");
    }
  });
}

function initContactPopup() {
  var popupBody = document.querySelector(".contact_popup");

  if (!popupBody) {
    return;
  }

  var popupContainer = document.querySelector(".popup_container");
  var poupBtn = document.querySelector(".popup_btn");
  var closeBtn = document.querySelector(".close_item");
  poupBtn.addEventListener("click", function () {
    popupBody.classList.add("popup_active");
    popupContainer.classList.add("cont_active");
    document.body.classList.add("popup_lock");
  });

  function closePopup() {
    popupBody.classList.remove("popup_active");
    popupContainer.classList.remove("cont_active");
    document.body.classList.remove("popup_lock");
  }

  closeBtn.addEventListener("click", function () {
    closePopup();
  });
  popupContainer.addEventListener("click", function (e) {
    if (e.target === popupContainer || e.target.classList.contains("close_item") == "") {
      closePopup();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && popupBody.classList.contains("popup_active")) {
      closePopup();
    }
  });
}

function findHref() {
  if (!element) {
    return;
  }

  var element = document.getElementById("menu").getElementsByTagName("a");
  var url = window.location.href;

  for (var i = 0; i < element.length; i++) {
    if (url === element[i].href) {
      element[i].classList.add("menu_link_active");
    }
  }
}
//# sourceMappingURL=main.js.map
