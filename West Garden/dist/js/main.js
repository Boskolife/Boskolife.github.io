"use strict";

jQuery(function () {
  $('.slider-view').slick({
    dots: true,
    arrows: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 1,
    centerMode: true,
    infinite: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false
      }
    }]
  });
  $('.slider-river').slick({
    dots: true,
    arrows: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 1,
    centerMode: true,
    infinite: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false
      }
    }]
  });
});
//# sourceMappingURL=main.js.map
