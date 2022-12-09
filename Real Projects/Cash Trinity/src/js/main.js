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

destroySlidersOnResize(".lending_slider", 9999, {
    spaceBetween: 20,
    sliderPerView:1,
    direction:'horizontal',
    mousewheel:{
      sensitivity:1,
    },
  
    pagination: {
      el: ".swiper-pagination",
      type:'progressbar',
    },

    breakpoints:{
      768:{
        direction:'vertical',
        autoHeght:true,
      }
    }
});
  

const burger = document.querySelector(".burger_menu");
const menuBody = document.querySelector(".nav");
const linkClose = document.querySelectorAll(".link-close");
if (burger) {
  burger.addEventListener("click", function (e) {
    document.body.classList.toggle("body_lock");
    burger.classList.toggle("burger_active");
    menuBody.classList.toggle("menu_active");
  });
};

if (linkClose.length) {
  for(var i =0;i<linkClose.length;++i){
    linkClose[i].addEventListener("click", function (e) {
      document.body.classList.remove("body_lock");
      burger.classList.remove("burger_active");
      menuBody.classList.remove("menu_active");
    })
  }
};


new CircleType(document.getElementById('simple_arc'))