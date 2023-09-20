"use strict";

initBurger();
anchorListener();
findHref();
imageFilter();
var logoSwiper = new Swiper(".logo_swiper", {
  slidesPerView: 5.5,
  spaceBetween: 30,
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    480: {
      slidesPerView: 2.5
    },
    768: {
      slidesPerView: 3.5
    },
    1024: {
      slidesPerView: 5.5
    }
  }
});
var landscapesSwiper = new Swiper(".landscapes_swiper", {
  slidesPerView: "auto",
  speed: 2000,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  autoHeight: true,
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  breakpoints: {
    320: {
      spaceBetween: 10
    },
    1024: {
      spaceBetween: 30
    }
  }
});
var landscapesPageSwiper = new Swiper(".landscapes_page_swiper", {
  direction: "vertical",
  spaceBetween: 30,
  speed: 1000,
  mousewheel: {
    releaseOnEdges: true
  },
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  }
});

function initBurger() {
  var menu = document.querySelector(".nav");
  var burger = document.querySelector(".header_burger");
  var menuItems = document.querySelectorAll(".menu_item");
  burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    menu.classList.toggle("menu_active");
    document.body.classList.toggle("body_lock");
  });
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      burger.classList.remove("burger_active");
      menu.classList.remove("menu_active");
      document.body.classList.remove("body_lock");
    });
  });
}

function anchorListener() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth > 1024) {
    return;
  }

  var targetElements = document.querySelectorAll(".hoverCard");
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
  };

  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("orangeHover");
      } else {
        entry.target.classList.remove("orangeHover");
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);
  targetElements.forEach(function (targetElement) {
    observer.observe(targetElement);
  });
}

function findHref() {
  var element = document.getElementById("menu").getElementsByTagName("a");
  var url = window.location.href;

  for (var i = 0; i < element.length; i++) {
    if (url === element[i].href) {
      element[i].classList.add("item_active");
    }
  }
}

Fancybox.bind("[data-fancybox]", {// Your custom options
  // groupAll: true,
});

function imageFilter() {
  var list = document.querySelector(".filter_list");
  var items = document.querySelectorAll(".gallery_item");
  var filterListItems = document.querySelectorAll(".filter_item");
  list.addEventListener("click", function (e) {
    var targetId = e.target.closest('.filter_item').dataset.id;
    var target = e.target;

    if (target.classList.contains("filter_item")) {
      filterListItems.forEach(function (listItem) {
        listItem.classList.remove("activeFilter");
        target.classList.add("activeFilter");
      });
    }

    getItems(targetId === 'all' ? "gallery_item" : targetId);
  });

  function getItems(className) {
    items.forEach(function (item) {
      if (item.classList.contains(className)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}
//# sourceMappingURL=main.js.map
