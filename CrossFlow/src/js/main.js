// Swiper:

function destroySlidersOnResize(selector, width, obj, moreThan) {
    const init = {
      ...obj,
    };
  
    const win = window;
    const sliderSelector = document.querySelector(selector);
    let swiper = new Swiper(selector, init);
  
    const toggleInit = () => {
      const neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width
      if (neededWidth) {
        if (!sliderSelector.classList.contains("swiper-initialized")) {
          swiper = new Swiper(selector, init);
        }
      } else if (sliderSelector.classList.contains("swiper-initialized")) {
        swiper.destroy();
      }
    };
  
    ["load", "resize"].forEach((evt) =>
      win.addEventListener(evt, toggleInit, false)
    );
}

destroySlidersOnResize(".me-slider", 960, {
    spaceBetween: 20,
  
    pagination: {
      el: ".swiper-pagination",
    },
});

/* header */

window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {
      const targetElement = e.target;
      if (window.innerWidth < 1024) {
          if (targetElement.classList.contains('arrows')) {
              targetElement.closest('.menu-item').classList.toggle('menu-item_active');
              targetElement.closest('.menu').classList.toggle('opacity-links')
          }
      }
  }
};

const burger = document.querySelector(".burger");
const menuBody = document.querySelector(".menu-wrap");
const linkClose = document.querySelectorAll(".link-close");
if (burger) {
burger.addEventListener("click", function (e) {
  document.body.classList.toggle("body_lock");
  document.body.classList.toggle("active");
  if(burger.classList.contains('burger_active')) {
      burger.classList.add('burger_finish');
      burger.classList.remove('burger_active');
    } else {
      burger.classList.add('burger_active');
      burger.classList.remove('burger_finish');
    }
  menuBody.classList.toggle("menu_active");
});
};

if (linkClose.length) {
  for(var i =0;i<linkClose.length;++i){
      linkClose[i].addEventListener("click", function (e) {
          document.body.classList.remove("body_lock");
          document.body.classList.remove("active");
          burger.classList.remove("burger_active");
          burger.classList.add('burger_finish');
          menuBody.classList.remove("menu_active");
      })
  }
};