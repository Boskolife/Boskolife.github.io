"use strict";

jQuery(function () {
  $('.slider').slick({
    dots: false,
    arrows: true,
    speed: 1000,
    autoplay: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false
      }
    }]
  });
});
//# sourceMappingURL=main.js.map
