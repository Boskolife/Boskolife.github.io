// Swiper:
let imageRotate = 0;

const slider = new Swiper(".main_swiper", {
    speed: 1500,
    mousewheel: true,
    slidesPerView: 1,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    effect: "creative",
    creativeEffect: {
        prev: {
            opacity: 0,
        },
        next: {
            opacity: 0,
        },
    },
    breakpoints: {
        320: {
            autoHeight: true,
        },
        1024: {
            autoHeight: false,
        },
    },
    on: {
        slideChange: (self) => {
            const sideWrap = document.querySelector(".progressBar");
            const logo = document.getElementById("logo");
            let progressBar = document.getElementById("progressBar");
            const rotateElem = document.querySelector(".progress_img");
            let progress = self.progress * (100 - 4.75);
            sideWrap.style.left = `${progress}%`;
            if (self.activeIndex > 0) {
                logo.style.opacity = "0";
            } else {
                logo.style.opacity = "1";
            }
        },

        slideNextTransitionStart: (self) => {
            const rotateElem = document.querySelector(".progress_img");
            let progress = self.progress * 100;
            rotateElem.style.transform = `
            translateY(-50%) rotate(${(imageRotate += 45)}deg)
            `;
        },

        slidePrevTransitionStart: (self) => {
            const rotateElem = document.querySelector(".progress_img");
            let progress = self.progress * 100;
            rotateElem.style.transform = `
            translateY(-50%) rotate(${(imageRotate -= 45)}deg)
            `;
        },
    },
});