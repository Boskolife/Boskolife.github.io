/* parallax */

let m2 = document.getElementById('m2');
let m3 = document.getElementById('m3');
let cloud1 = document.getElementById('cloud1');
let cloud2 = document.getElementById('cloud2');
let cloud3 = document.getElementById('cloud3');
let text = document.getElementById('text');
let msec = document.getElementById('msec');
let tsec = document.getElementById('tsec');


window.addEventListener('scroll', function () {
  let value = window.scrollY;
  let endParalax = tsec.offsetTop + tsec.offsetHeight;
  let laptop = window.matchMedia("(min-width: 1450px)");
  let widescreen = window.matchMedia("(min-width: 1200px)");
  let tablet = window.matchMedia("(min-width: 768px)");
  let phone = window.matchMedia("(min-width: 480px)");

  if (value > endParalax) {
    return;
  }

  if (laptop.matches) {
    m2.style.top = 475 + value * 0.05 + 'px';
    m3.style.top = 390 + value * -0.3 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 340 + value * 0.2 + 'px';
    cloud2.style.bottom = -325 + value * 0.2 + 'px';
    cloud3.style.bottom = -15 + value * 0.2 + 'px';
    text.style.top = 415 + value * 0.3 + 'px';
    msec.style.minHeight = 1785 + value * -0.3 + 'px';
  } else if (widescreen.matches) {
    m2.style.top = 350 + value * 0.05 + 'px';
    m3.style.top = 200 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 240 + value * 0.1 + 'px';
    cloud2.style.bottom = -240 + value * 0.1 + 'px';
    cloud3.style.bottom = -15 + value * 0.1 + 'px';
    text.style.top = 220 + value * 0.3 + 'px';
    msec.style.minHeight = 1205 + value * -0.2 + 'px';
  } else if (tablet.matches) {
    m2.style.top = 265 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 240 + value * 0.1 + 'px';
    cloud2.style.bottom = -240 + value * 0.1 + 'px';
    cloud3.style.bottom = -40 + value * 0.1 + 'px';
    text.style.top = 120 + value * 0.3 + 'px';
    msec.style.minHeight = 940 + value * -0.2 + 'px';
  } else if (phone.matches) {
    m2.style.top = 185 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -100 + value * -0.3 + 'px';
    cloud1.style.bottom = 80 + value * 0.1 + 'px';
    cloud2.style.bottom = -140 + value * 0.1 + 'px';
    cloud3.style.bottom = -40 + value * 0.1 + 'px';
    text.style.top = 160 + value * 0.3 + 'px';
    msec.style.minHeight = 640 + value * -0.2 + 'px';
  } else {
    m2.style.top = 185 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100 + value * -0.3 + 'px';
    cloud3.style.right = -100 + value * -0.3 + 'px';
    cloud1.style.bottom = 80 + value * 0.1 + 'px';
    cloud2.style.bottom = -70 + value * 0.1 + 'px';
    cloud3.style.bottom = value * 0.1 + 'px';
    text.style.top = 160 + value * 0.3 + 'px';
    msec.style.minHeight = 640 + value * -0.2 + 'px';
  }
})

/* ///// */

const burger = document.querySelector(".burger_menu");
const menuBody = document.querySelector(".nav");
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

// Swiper:

function destroySlidersOnResize(selector, width, obj, moreThan) {
  const init = {
    ...obj,
  };

  const win = window;
  const sliderSelector = document.querySelector(selector);
  let swiper = new Swiper(selector, init);

  const toggleInit = () => {
    const neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width
    if (neededWidth) {
      if (!sliderSelector.classList.contains("swiper-initialized")) {
        swiper = new Swiper(selector, init);
      }
    } else if (sliderSelector.classList.contains("swiper-initialized")) {
      swiper.destroy();
    }
  };

  ["load", "resize"].forEach((evt) =>
    win.addEventListener(evt, toggleInit, false)
  );
}

destroySlidersOnResize(".reviews-slider", 9999, {
  slidesPerView: 2,
  watchOverflow: true,
  speed: 800,


  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* Parallax Cursor Position */

document.addEventListener("mousemove", parallax);
function parallax(event) {
  this.querySelectorAll(".parallax-wrap #parallax").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 90;
    const y = (window.innerHeight - event.pageY * position) / 90;

    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

/* ///// */

/* toggle button */

const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('weather');
})

/* ///// */