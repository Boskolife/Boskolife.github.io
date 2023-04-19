"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

initSwiper();
initBurger();
findHref();
initContactPopup();
playAudio(); // initMainVideo();

function initSwiper() {
  function destroySlidersOnResize(selector, width, obj, moreThan) {
    var init = _objectSpread({}, obj);

    var win = window;
    var sliderSelector = document.querySelector(selector);

    if (!sliderSelector) {
      return;
    }

    var swiper = new Swiper(selector, init);

    var toggleInit = function toggleInit() {
      var neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width;

      if (neededWidth) {
        if (!sliderSelector.classList.contains("swiper-initialized")) {
          swiper = new Swiper(selector, init);
        }
      } else if (sliderSelector.classList.contains("swiper-initialized")) {
        swiper.destroy();
      }
    };

    ["load", "resize"].forEach(function (evt) {
      return win.addEventListener(evt, toggleInit, false);
    });
  }

  destroySlidersOnResize(".post_swiper", 9999, {
    slidesPerView: 1.5,
    spaceBetween: 20,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    breakpoints: {
      1024: {
        slidesPerView: 2.3,
        spaceBetween: 30
      }
    }
  });
  destroySlidersOnResize(".podcast_swiper", 9999, {
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets"
    }
  });
  destroySlidersOnResize(".tab_swiper", 9999, {
    slidesPerView: 2,
    spaceBetween: 10,
    grabCursor: true,
    grid: {
      rows: 3,
      fill: "row"
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
        grid: {
          rows: 3,
          fill: "row"
        }
      }
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });
}

function initBurger() {
  var btnBurger = document.querySelector(".header_burger");

  if (!btnBurger) {
    return;
  }

  var menuBurger = document.querySelector(".nav");
  document.addEventListener("click", function (event) {
    if (btnBurger.contains(event.target)) {
      menuBurger.classList.toggle("nav_active");
      btnBurger.classList.toggle("burger_active");
      document.body.classList.toggle("body_lock");
      return;
    }

    if (!menuBurger.contains(event.target)) {
      menuBurger.classList.remove("nav_active");
      btnBurger.classList.remove("burger_active");
      document.body.classList.remove("body_lock");
    }
  });
}

function initContactPopup() {
  var popupBody = document.querySelector(".contact_popup");

  if (!popupBody) {
    return;
  }

  var popupContainer = document.querySelector(".popup_container");
  var poupBtn = document.querySelector(".popup_btn");
  var closeBtn = document.querySelector(".close_item");
  poupBtn.addEventListener("click", function () {
    popupBody.classList.add("popup_active");
    popupContainer.classList.add("cont_active");
    document.body.classList.add("popup_lock");
  });

  function closePopup() {
    popupBody.classList.remove("popup_active");
    popupContainer.classList.remove("cont_active");
    document.body.classList.remove("popup_lock");
  }

  closeBtn.addEventListener("click", function () {
    closePopup();
  });
  popupContainer.addEventListener("click", function (e) {
    if (e.target === popupContainer || e.target.classList.contains("close_item") == "") {
      closePopup();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && popupBody.classList.contains("popup_active")) {
      closePopup();
    }
  });
}

function findHref() {
  var element = document.getElementById("menu").getElementsByTagName("a");

  if (!element) {
    return;
  }

  var url = window.location.href;

  for (var i = 0; i < element.length; i++) {
    if (url === element[i].href) {
      element[i].classList.add("menu_link_active");
    }
  }
}

function videoPlay() {
  var video = document.getElementById("video");
  var videoBTn = document.getElementById("play");

  if (video.paused) {
    video.play();
    videoBTn.style = "display:none";
    video.setAttribute("controls", "");
  }
}

function initMainVideo() {
  var mainVideo = document.querySelector(".main_video");
  var soundBtn = document.querySelector(".sound_btn");
  var srcBtn = document.querySelector(".btn_src");

  function muteVideo() {
    mainVideo.classList.add("muted");
    mainVideo.muted = true;
    srcBtn.src = "./images/main/mute.svg";
  }

  function unmuteVideo() {
    mainVideo.classList.remove("muted");
    mainVideo.muted = false;
    srcBtn.src = "./images/main/unmute.svg";
  }

  soundBtn.addEventListener("click", function () {
    var isMuted = mainVideo.classList.contains("muted");

    if (isMuted) {
      unmuteVideo();
    } else {
      muteVideo();
    }
  });
}

function playAudio() {
  var audio = document.querySelector(".audio");

  if (!audio) {
    return;
  }

  var playBtn = document.querySelector(".playBtn");
  var btnSrc = document.querySelector(".btnSrc");
  var playProgress = document.querySelector(".progress");
  var playProgressContainer = document.querySelector(".progress_container");
  var currentTimeSong = document.querySelector(".currentTime");
  var durationSong = document.querySelector(".duration");

  function playSong() {
    audio.classList.add("play");
    audio.play();
    btnSrc.src = "./images/main/pause_btn.svg";
  }

  function pauseSong() {
    audio.classList.remove("play");
    audio.pause();
    btnSrc.src = "./images/main/play_btn.svg";
  }

  playBtn.addEventListener("click", function () {
    var isPlayaing = audio.classList.contains("play");

    if (isPlayaing) {
      pauseSong();
    } else {
      playSong();
    }
  });

  function timeduration(seconds) {
    var m = seconds / 60 | 0,
        s = "".concat(seconds % 60).padStart(2, 0);
    return "".concat(m < 10 ? "0".concat(m) : m, ":").concat(s);
  }

  audio.onloadeddata = function () {
    durationSong.innerHTML = timeduration(audio.duration.toFixed(0));
    currentTimeSong.innerHTML = timeduration(audio.currentTime.toFixed(0));
  };

  function updateProgress(e) {
    var _e$srcElement = e.srcElement,
        duration = _e$srcElement.duration,
        currentTime = _e$srcElement.currentTime;
    var progressPercent = currentTime / duration * 100;
    playProgress.style.width = "".concat(progressPercent, "%");
    durationSong.innerHTML = timeduration(audio.duration.toFixed(0));
    currentTimeSong.innerHTML = timeduration(audio.currentTime.toFixed(0));
  }

  audio.addEventListener("timeupdate", updateProgress);

  function endPlay() {
    btnSrc.src = "./images/main/play_btn.svg";
  }

  audio.addEventListener("ended", endPlay);

  function setProgress(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = audio.duration;
    audio.currentTime = clickX / width * duration;
  }

  playProgressContainer.addEventListener("click", setProgress);
}

function openTabEpisode(evt, tabName) {
  // Скрыть все табы
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  } // Убрать класс "active" со всех вкладок


  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active_tab", "");
  } // Показать нужный таб и сделать соответствующую вкладку активной


  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active_tab";
}
//# sourceMappingURL=main.js.map
