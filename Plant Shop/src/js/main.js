jQuery(function() {
    $('.slider').slick({
        dots:false,
        arrows:true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        speed:1000,
        responsive:[
          {
            breakpoint:768,
            settings: {
              arrows:false,
              autoplay:true,
            }
          }
        ]
    });
});

new WOW().init(); 
