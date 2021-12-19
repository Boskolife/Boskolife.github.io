const burger = document.querySelector(".burger");
const menuBody = document.querySelector(".main-links");
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


var acc = document.getElementsByClassName("button-spoller");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
  });
}