const burger = document.querySelector(".header-burger");
const menuBody = document.querySelector(".nav");
const linkClose = document.querySelector(".link-close");
if (burger)
 {
  burger.addEventListener("click", function (e) {
    document.body.classList.toggle("body_lock");
    burger.classList.toggle("burger_active");
    menuBody.classList.toggle("menu_active");
  });
};

if (linkClose) {
  linkClose.addEventListener("click", function (e) {
    document.body.classList.remove("body_lock");
    burger.classList.remove("burger_active");
    menuBody.classList.remove("menu_active");
  });
};


function initSliders(selector, width, obj) {
  const init = {
    infinite: false,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    ...obj,
  };

  $(() => {
    const win = $(window);
    const slider = $(selector);

    win.on("load resize", () => {
      if (win.width() <= width) {
        slider.not(".slick-initialized").slick(init);
      } else if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
      }
    });
  });
};

initSliders(".service-item-block", 1024, {
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
  infinite: true,
  dots: true,
  arrows: false,
  adaptiveHeight: true,
  touchThreshold: 50,
  responsive:[
  {
    breakpoint:768,
      settings:{
        slidesToShow: 1,
      }
  }
  ]
});

initSliders(".bot-dev-text", 1024, {
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
  infinite: true,
  dots: true,
  arrows: false,
  adaptiveHeight: true,
  touchThreshold: 50,
  responsive:[
  {
    breakpoint:768,
      settings:{
        slidesToShow: 1,
      }
  }
  ]
});

initSliders(".reviews-content", 1024, {
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
  infinite: true,
  dots: true,
  arrows: false,
  adaptiveHeight: true,
  touchThreshold: 50,
  responsive:[
  {
    breakpoint:768,
      settings:{
        slidesToShow: 1,
      }
  }
  ]
});

new WOW().init();
