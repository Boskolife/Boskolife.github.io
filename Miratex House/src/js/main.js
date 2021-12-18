
new WOW().init();  

jQuery(function() {
    $('.block-info').slick({
        dots:false,
        arrows:true,
        speed:1000,
        responsive:[
            {
              breakpoint:768,
              settings: {
                arrows:false
              }
            }
          ]
    });
});



var acc = document.getElementsByClassName("item-spoller");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
    });
}



