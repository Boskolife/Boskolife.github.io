ininSwiper();
initBurger();

function ininSwiper() {
    function destroySlidersOnResize(selector, width, obj, moreThan) {
        const init = {
            ...obj,
        };

        const win = window;
        const sliderSelector = document.querySelector(selector);
        if (!sliderSelector) {
            return;
        }
        let swiper = new Swiper(selector, init);

        const toggleInit = () => {
            const neededWidth = moreThan
                ? win.innerWidth >= width
                : win.innerWidth <= width;
            if (neededWidth) {
                if (!sliderSelector.classList.contains("swiper-initialized")) {
                    swiper = new Swiper(selector, init);
                }
            } else if (
                sliderSelector.classList.contains("swiper-initialized")
            ) {
                swiper.destroy();
            }
        };

        ["load", "resize"].forEach((evt) =>
            win.addEventListener(evt, toggleInit, false)
        );
    }

    destroySlidersOnResize(".reviews_swiper", 9999, {
        spaceBetween: 20,
        direction: "horizontal",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1024: {
                direction: "vertical",
            },
        },
    });
}

function initBurger() {
    const burger = document.querySelector(".burger_wrap");
    const menu = document.querySelector(".nav");
    const menuContainer = document.querySelector(".menu_container");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        menu.classList.toggle("menu_active");
        menuContainer.classList.toggle("menu_container_active");
        document.body.classList.toggle("body_lock");
    });
}

var slider = document.getElementById("slider");
var imageBefore = document.querySelector(".before img");
var imageAfter = document.querySelector(".after img");
var containerWidth = slider.parentNode.offsetWidth;
var sliderWidth = slider.offsetWidth;
var isDragging = false;
var startX;
var startLeft;

function updateImageClipPath(percentage) {
    var clipPathValue =
        "polygon(0 0, " + percentage + "% 0, " + percentage + "% 100%, 0 100%)";
    imageBefore.style.clipPath = clipPathValue;
    imageAfter.style.clipPath = clipPathValue;
}

slider.addEventListener("mousedown", function (event) {
    event.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    startX = event.clientX;
    startLeft = slider.offsetLeft;
});

document.addEventListener("mousemove", function (event) {
    if (isDragging) {
        var offsetX = event.clientX - startX;
        var newPosition = Math.max(
            0,
            Math.min(containerWidth - sliderWidth, startLeft + offsetX)
        );
        var percentage = (newPosition / containerWidth) * 100;
        slider.style.left = newPosition + "px";
        updateImageClipPath(percentage);
    }
});

document.addEventListener("mouseup", function () {
    if (isDragging) {
        isDragging = false;
        slider.classList.remove("dragging");
    }
});

// Обновляем путь обрезки изображений при изменении размеров окна
window.addEventListener("resize", function () {
    containerWidth = slider.parentNode.offsetWidth;
    var currentPosition = parseInt(slider.style.left, 10);
    var percentage = (currentPosition / containerWidth) * 100;
    updateImageClipPath(percentage);
});

// Инициализация пути обрезки изображений при загрузке страницы
var initialPosition = containerWidth / 2;
slider.style.left = initialPosition + "px";
updateImageClipPath(50);
