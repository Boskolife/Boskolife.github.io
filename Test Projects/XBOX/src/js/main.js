jQuery(function() {
    $('.slider').slick({
        dots:true,
        speed:1000,
        autoplay:true,
        responsive:[
          {
            breakpoint:768,
            settings: {
              arrows:false
            }
          }
        ]
    });
    $('.slider-exclusive').slick({
        speed:800,
        slidesToShow:3,
        responsive:[
          {
            breakpoint:1024,
            settings: {
              slidesToShow:2,
              arrows:false
            }
          },{
            breakpoint:600,
            settings: {
              slidesToShow:1,
              arrows:false
            }
          }
        ]
    })
});
const burger = document.querySelector(".header-burger");
const menuBody = document.querySelector(".more-header");
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

