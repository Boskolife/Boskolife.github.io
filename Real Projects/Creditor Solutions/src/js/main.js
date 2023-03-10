
const burger = document.querySelector(".burger_menu");
const menuBody = document.querySelector(".nav");
const phone = document.querySelector(".phone");

burger.addEventListener('click', () =>{
    menuBody.classList.toggle('menu_active');
    phone.classList.toggle('menu_active');
    burger.classList.toggle("burger_active");
    document.body.style.overflow = 'hidden';
});