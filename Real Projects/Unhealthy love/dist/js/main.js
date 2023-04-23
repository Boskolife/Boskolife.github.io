"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

initSwiper();
initBurger();
findHref();
initContactPopup();
playAudio();
openArticlePost();
initMainAudio();
getCardData();
initCircleBtn();

function initCircleBtn() {
  var circleBtn = document.querySelector(".sound_btn");
  var firstSection = document.querySelectorAll("section")[0];
  var footer = document.querySelector("footer");
  if (!circleBtn || !firstSection) return;
  checkStickyBtn();
  document.addEventListener("scroll", checkStickyBtn);
  window.addEventListener("resize", checkStickyBtn);

  function checkStickyBtn() {
    var firstSecHeight = firstSection.offsetHeight;
    var currentScrollPosY = window.scrollY;
    var firstSectionBottomPadding = getComputedStyle(firstSection).paddingBottom.replace(/px/g, "");
    var currentScrollBottomPos = window.scrollY + window.innerHeight;
    currentScrollPosY > firstSecHeight - +firstSectionBottomPadding ? circleBtn.classList.add("sticky") : circleBtn.classList.remove("sticky");

    if (footer) {
      var footerTopPos = footer.offsetTop;
      var footerTopPadding = getComputedStyle(firstSection).paddingTop.replace(/px/g, "");
      currentScrollBottomPos >= footerTopPos + +footerTopPadding / 2 ? circleBtn.classList.add("hidden") : circleBtn.classList.remove("hidden");
    }
  }
}

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
    // grid: {
    //     rows: 3,
    //     fill: "row",
    // },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    breakpoints: {
      650: {
        slidesPerView: 2.5
      },
      1024: {
        slidesPerView: 3.3,
        spaceBetween: 30
      }
    }
  });
  destroySlidersOnResize(".podcast_swiper", 9999, {
    slidesPerView: 1,
    grabCursor: true,
    clickable: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      horizontalClass: 'horizont'
    }
  });
  destroySlidersOnResize(".blog_swiper", 9999, {
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    }
  });
  destroySlidersOnResize(".tab_post_swiper", 9999, {
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: true,
    clickable: true,
    grid: {
      rows: 3,
      fill: "row"
    },
    breakpoints: {
      650: {
        slidesPerView: 2,
        grid: {
          rows: 3,
          fill: "row"
        }
      },
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
  var menuContainer = document.querySelector(".nav_container");
  document.addEventListener("click", function (event) {
    if (btnBurger.contains(event.target)) {
      menuBurger.classList.toggle("nav_active");
      btnBurger.classList.toggle("burger_active");
      menuContainer.classList.toggle("nav_container_active");
      document.body.classList.toggle("body_lock");
      return;
    }

    if (!menuBurger.contains(event.target)) {
      menuBurger.classList.remove("nav_active");
      btnBurger.classList.remove("burger_active");
      document.body.classList.remove("body_lock");
      menuContainer.classList.remove("nav_container_active");
    }
  });
}

function initContactPopup() {
  var popupBody = document.querySelector(".contact_popup");

  if (!popupBody) {
    return;
  }

  var popupContainer = document.querySelector(".popup_container");
  var poupBtn = document.querySelectorAll(".popup_btn");
  var closeBtn = document.querySelector(".close_item");
  poupBtn.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      popupBody.classList.add("popup_active");
      popupContainer.classList.add("cont_active");
      document.body.classList.add("popup_lock");
    });
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
  var videoText = document.querySelector(".video_text");
  var closeElement = document.querySelectorAll(".closeElement");
  videoBTn.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      videoBTn.style.display = "none";
      video.setAttribute("controls", "");
      videoText.style.display = "none";
    }
  });
  closeElement.forEach(function (item) {
    item.addEventListener('click', function () {
      video.pause();
    });
  });
}

function initMainAudio() {
  var mainAudio = document.querySelector(".main_audio");

  if (!mainAudio) {
    return;
  }

  var soundBtn = document.querySelector(".sound_btn");
  var srcBtn = document.querySelector(".btn_src");
  soundBtn.addEventListener("click", function () {
    if (mainAudio.paused) {
      mainAudio.play();
      srcBtn.src = "./images/main/mute.svg";
    } else {
      mainAudio.pause();
      srcBtn.src = "./images/main/unmute.svg";
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
  var closeElement = document.querySelectorAll(".closeElement");

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
    var isPlaying = audio.classList.contains("play");

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
  closeElement.forEach(function (item) {
    item.addEventListener('click', function () {
      pauseSong();
    });
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

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active_tab", "");
  }

  document.getElementById(tabName).style.display = "grid";
  evt.currentTarget.className += " active_tab";
}

function openArticlePost() {
  var openArticleBtn = document.querySelector(".open_article");

  if (!openArticleBtn) {
    return;
  }

  var blogTitle = document.querySelector(".blog_page_title");
  var returnBtn = document.querySelector(".returnBlog");
  var blogPage = document.querySelector(".blog_page");
  var post = document.getElementById("post");
  var postList = document.getElementById("post_list");

  function openPost() {
    post.classList.add("current_post");
    postList.classList.add("hidden_list");
    blogTitle.classList.add("hidden_title");
    returnBtn.classList.add("active_return");
    blogPage.classList.add("hide_page");
  }

  function closePost() {
    post.classList.remove("current_post");
    postList.classList.remove("hidden_list");
    blogTitle.classList.remove("hidden_title");
    returnBtn.classList.remove("active_return");
    blogPage.classList.remove("hide_page");
  }

  openArticleBtn.addEventListener("click", function (e) {
    openPost();
  });
  returnBtn.addEventListener("click", function () {
    closePost();
  });
}

function getCardData() {
  var getDataSrc = document.querySelectorAll(".getDataSrc");

  if (!getDataSrc) {
    return;
  }

  getDataSrc.forEach(function (item) {
    var videoElement = item.querySelector(".getVideoCard");
    var audioElement = item.querySelector(".getSongCard");
    var duration = item.querySelector(".getDuration");

    if (videoElement) {
      videoElement.onloadeddata = function () {
        duration.innerHTML = timeduration(videoElement.duration);
      };
    }

    if (audioElement) {
      audioElement.onloadeddata = function () {
        duration.innerHTML = timeduration(audioElement.duration);
      };
    }

    item.addEventListener("click", function (e) {
      var _card$querySelector, _card$querySelector2, _card$querySelector3;

      var card = e.currentTarget;
      var imgSrc = (_card$querySelector = card.querySelector(".get_cardImg")) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.getAttribute("src");
      var songSrc = (_card$querySelector2 = card.querySelector(".getSongCard")) === null || _card$querySelector2 === void 0 ? void 0 : _card$querySelector2.getAttribute("src");
      var videoSrc = (_card$querySelector3 = card.querySelector(".getVideoCard")) === null || _card$querySelector3 === void 0 ? void 0 : _card$querySelector3.getAttribute("src");
      var numberEpisodeSpanElement = card.querySelector(".get_numberEp");
      var numberEpisodeText = numberEpisodeSpanElement.textContent;
      var titleElement = card.querySelector(".get_cardTitle");
      var titleText = titleElement.textContent;
      var descriptionElement = card.querySelector(".get_cardDescr");
      var descriptionText = descriptionElement.textContent;
      var guestIconSrc = card.querySelectorAll(".get_iconGuest");
      var guestNameElement = card.querySelectorAll(".get_nameGuest");
      setCardData(imgSrc, songSrc, videoSrc, numberEpisodeText, titleText, descriptionText, guestIconSrc, guestNameElement);
    });
  });

  function timeduration(seconds) {
    var m = seconds / 60 | 0;
    return "".concat(m, " min");
  }
}

function setCardData(imgSrc, songSrc, videoSrc, numberEpisodeText, titleText, descriptionText, guestIconSrc, guestNameElement) {
  var playerBody = document.querySelector(".player_body_wrap");
  var videoBody = document.querySelector(".video_body_wrap");

  if (!playerBody || !videoBody) {
    return;
  }

  var closeElement = document.querySelectorAll(".closeElement");
  var episodeText = document.querySelectorAll(".set_numberEp");
  var titleTextContent = document.querySelectorAll(".set_cardTitle");
  var descriptionTextContent = document.querySelector(".set_cardDescr");
  var guestIcon = songSrc ? playerBody.querySelectorAll(".set_iconGuest") : videoBody.querySelectorAll(".set_iconGuest");
  var guestName = songSrc ? playerBody.querySelectorAll(".set_nameGuest") : videoBody.querySelectorAll(".set_nameGuest");
  closeElement.forEach(function (item) {
    item.addEventListener("click", function () {
      playerBody.classList.remove("active_player_body_wrap");
      videoBody.classList.remove("active_video_body_wrap");
    });
  });
  episodeText.forEach(function (item) {
    item.textContent = numberEpisodeText;
  });
  titleTextContent.forEach(function (item) {
    item.textContent = titleText;
  });
  guestIcon.forEach(function (item, i) {
    item.setAttribute("src", guestIconSrc[i].getAttribute("src"));
  });
  guestName.forEach(function (item, i) {
    item.textContent = guestNameElement[i].textContent;
  });
  descriptionTextContent.textContent = descriptionText;

  if (songSrc) {
    playerBody.classList.add("active_player_body_wrap");
    videoBody.classList.remove("active_video_body_wrap");
    var img = playerBody.querySelector("img.set_cardImg");
    img.setAttribute("src", imgSrc);
    var audio = playerBody.querySelector("audio.setSongCard");
    audio.setAttribute("src", songSrc);
  } else {
    videoBody.classList.add("active_video_body_wrap");
    playerBody.classList.remove("active_player_body_wrap");
    var video = videoBody.querySelector("video.setVideoCard");
    video.setAttribute("src", videoSrc);
  }
}
//# sourceMappingURL=main.js.map
