initBurger()


function initBurger() {
    const burger = document.querySelector('.burger_menu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
    })

}