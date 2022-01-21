const burger = document.querySelector(".burger");
const menuBody = document.querySelector(".links");
const linkClose = document.querySelector(".link-close");
if (burger) {
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

jQuery(function () {
    $('.slider').slick({
        dots: false,
        arrows: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        speed: 1000,
        slidesToShow: 3,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});