initBurger();

function initBurger() {
    const burger = document.querySelector(".header_burger");
    const burgerMenu = document.querySelector(".nav");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        burgerMenu.classList.toggle("menu_active");
    });
}
