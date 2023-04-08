initBurger();

function initBurger() {
    const burger = document.querySelector(".burger_menu");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        document.body.classList.toggle("body_lock");
    });
}
