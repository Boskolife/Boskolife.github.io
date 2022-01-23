const burger = document.querySelector(".burger");
const menuBody = document.querySelector(".links");
const linkClose = document.querySelector(".link-close");
if (burger) {
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

jQuery(function () {
    $('.slider').slick({
        dots: false,
        arrows: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        speed: 1000,
        slidesToShow: 3,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});

let popupBg = document.querySelector('.popup-bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
    })
});

closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if (e.target === popupBg) { // Если цель клика - фот, то:
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна
    }
});
