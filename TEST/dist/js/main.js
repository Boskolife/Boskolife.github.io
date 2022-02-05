"use strict";

jQuery(function () {
  $('.article-slider').slick({
    dots: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false
      }
    }]
  });
  $('.title-slider').slick({
    dots: true,
    arrows: false
  });
});
//# sourceMappingURL=main.js.map
