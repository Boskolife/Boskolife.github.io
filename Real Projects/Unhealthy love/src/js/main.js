initSwiper();
initBurger();
findHref();
initContactPopup();
playAudio();
openArticlePost();
initMainAudio();
getCardData();

function initSwiper() {
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

    destroySlidersOnResize(".post_swiper", 9999, {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        // grid: {
        //     rows: 3,
        //     fill: "row",
        // },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            650: {
                slidesPerView: 1.5,
            },
            1024: {
                slidesPerView: 2.3,
                spaceBetween: 30,
            },
        },
    });

    destroySlidersOnResize(".podcast_swiper", 9999, {
        slidesPerView: 1,
        grabCursor: true,
        clickable: true,
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });

    destroySlidersOnResize(".blog_swiper", 9999, {
        slidesPerView: 1,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });

    destroySlidersOnResize(".tab_post_swiper", 9999, {
        slidesPerView: 1,
        spaceBetween: 10,
        grabCursor: true,
        clickable: true,
        grid: {
            rows: 3,
            fill: "row",
        },
        breakpoints: {
            650: {
                slidesPerView: 2,
                grid: {
                    rows: 3,
                    fill: "row",
                },
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                grid: {
                    rows: 3,
                    fill: "row",
                },
            },
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

function initBurger() {
    const btnBurger = document.querySelector(".header_burger");
    if (!btnBurger) {
        return;
    }
    const menuBurger = document.querySelector(".nav");

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
    const popupBody = document.querySelector(".contact_popup");
    if (!popupBody) {
        return;
    }
    const popupContainer = document.querySelector(".popup_container");
    const poupBtn = document.querySelectorAll(".popup_btn");
    const closeBtn = document.querySelector(".close_item");

    poupBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
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

    closeBtn.addEventListener("click", () => {
        closePopup();
    });

    popupContainer.addEventListener("click", (e) => {
        if (
            e.target === popupContainer ||
            e.target.classList.contains("close_item") == ""
        ) {
            closePopup();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (
            e.code === "Escape" &&
            popupBody.classList.contains("popup_active")
        ) {
            closePopup();
        }
    });
}

function findHref() {
    let element = document.getElementById("menu").getElementsByTagName("a");
    if (!element) {
        return;
    }
    let url = window.location.href;
    for (let i = 0; i < element.length; i++) {
        if (url === element[i].href) {
            element[i].classList.add("menu_link_active");
        }
    }
}

function videoPlay() {
    let video = document.getElementById("video");
    let videoBTn = document.getElementById("play");
    const videoText = document.querySelector(".video_text");

    videoBTn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            videoBTn.style.display = "none";
            video.setAttribute("controls", "");
            videoText.style.display = "none";
        }
    });
}

function initMainAudio() {
    const mainAudio = document.querySelector(".main_audio");
    if (!mainAudio) {
        return;
    }
    const soundBtn = document.querySelector(".sound_btn");
    const srcBtn = document.querySelector(".btn_src");

    soundBtn.addEventListener("click", () => {
        if (mainAudio.paused) {
            mainAudio.play();
            srcBtn.src = "./images/main/unmute.svg";
        } else {
            mainAudio.pause();
            srcBtn.src = "./images/main/mute.svg";
        }
    });
}

function playAudio() {
    const audio = document.querySelector(".audio");
    if (!audio) {
        return;
    }
    const playBtn = document.querySelector(".playBtn");
    const btnSrc = document.querySelector(".btnSrc");
    const playProgress = document.querySelector(".progress");
    const playProgressContainer = document.querySelector(".progress_container");
    const currentTimeSong = document.querySelector(".currentTime");
    const durationSong = document.querySelector(".duration");

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

    playBtn.addEventListener("click", () => {
        const isPlayaing = audio.classList.contains("play");
        if (isPlayaing) {
            pauseSong();
        } else {
            playSong();
        }
    });

    function timeduration(seconds) {
        const m = (seconds / 60) | 0,
            s = `${seconds % 60}`.padStart(2, 0);

        return `${m < 10 ? `0${m}` : m}:${s}`;
    }

    audio.onloadeddata = () => {
        durationSong.innerHTML = timeduration(audio.duration.toFixed(0));
        currentTimeSong.innerHTML = timeduration(audio.currentTime.toFixed(0));
    };

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        playProgress.style.width = `${progressPercent}%`;
        durationSong.innerHTML = timeduration(audio.duration.toFixed(0));
        currentTimeSong.innerHTML = timeduration(audio.currentTime.toFixed(0));
    }

    audio.addEventListener("timeupdate", updateProgress);

    function endPlay() {
        btnSrc.src = "./images/main/play_btn.svg";
    }

    audio.addEventListener("ended", endPlay);

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
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
        tablinks[i].className = tablinks[i].className.replace(
            " active_tab",
            ""
        );
    }

    document.getElementById(tabName).style.display = "grid";
    evt.currentTarget.className += " active_tab";
}

function openArticlePost() {
    const openArticleBtn = document.querySelector(".open_article");
    if (!openArticleBtn) {
        return;
    }
    const blogTitle = document.querySelector(".blog_page_title");
    const returnBtn = document.querySelector(".returnBlog");
    const blogPage = document.querySelector(".blog_page");
    const post = document.getElementById("post");
    const postList = document.getElementById("post_list");

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

    openArticleBtn.addEventListener("click", (e) => {
        openPost();
    });

    returnBtn.addEventListener("click", () => {
        closePost();
    });
}

function getCardData() {
    const getDataSrc = document.querySelectorAll(".getDataSrc");
    if (!getDataSrc) {
        return;
    }

    getDataSrc.forEach((item) => {
        const videoElement = item.querySelector(".getVideoCard");
        const audioElement = item.querySelector(".getSongCard");
        const duration = item.querySelector(".getDuration");

        if (videoElement) {
            videoElement.onloadeddata = () => {
                duration.innerHTML = timeduration(videoElement.duration);
            };
        }
        if (audioElement) {
            audioElement.onloadeddata = () => {
                duration.innerHTML = timeduration(audioElement.duration);
            };
        }

        item.addEventListener("click", (e) => {
            const card = e.currentTarget;
            const imgSrc = card.querySelector(".get_cardImg")?.getAttribute("src");
            const songSrc = card.querySelector(".getSongCard")?.getAttribute("src");
            const videoSrc = card.querySelector(".getVideoCard")?.getAttribute("src");
            const numberEpisodeSpanElement = card.querySelector(".get_numberEp");
            const numberEpisodeText = numberEpisodeSpanElement.textContent;
            const titleElement = card.querySelector(".get_cardTitle");
            const titleText = titleElement.textContent;
            const descriptionElement = card.querySelector(".get_cardDescr");
            const descriptionText = descriptionElement.textContent;
            const guestIconSrc = card.querySelectorAll(".get_iconGuest");
            const guestNameElement = card.querySelectorAll(".get_nameGuest");

            setCardData(
                imgSrc,
                songSrc,
                videoSrc,
                numberEpisodeText,
                titleText,
                descriptionText,
                guestIconSrc,
                guestNameElement
            );
        });
    });

    function timeduration(seconds) {
        const m = (seconds / 60) | 0;

        return `${m} min`;
    }
}

function setCardData(
    imgSrc,
    songSrc,
    videoSrc,
    numberEpisodeText,
    titleText,
    descriptionText,
    guestIconSrc,
    guestNameElement
) {
    const playerBody = document.querySelector(".player_body_wrap");
    const videoBody = document.querySelector(".video_body_wrap");
    if (!playerBody || !videoBody) {
        return;
    }
    const closeElement = document.querySelectorAll(".closeElement");
    const episodeText = document.querySelectorAll(".set_numberEp");
    const titleTextContent = document.querySelectorAll(".set_cardTitle");
    const descriptionTextContent = document.querySelector(".set_cardDescr");
    const guestIcon = songSrc
        ? playerBody.querySelectorAll(".set_iconGuest")
        : videoBody.querySelectorAll(".set_iconGuest");
    const guestName = songSrc
        ? playerBody.querySelectorAll(".set_nameGuest")
        : videoBody.querySelectorAll(".set_nameGuest");

    closeElement.forEach((item) => {
        item.addEventListener("click", () => {
            playerBody.classList.remove("active_player_body_wrap");
            videoBody.classList.remove("active_video_body_wrap");
        });
    });

    episodeText.forEach((item) => {
        item.textContent = numberEpisodeText;
    });

    titleTextContent.forEach((item) => {
        item.textContent = titleText;
    });

    guestIcon.forEach((item, i) => {
        item.setAttribute("src", guestIconSrc[i].getAttribute("src"));
    });

    guestName.forEach((item, i) => {
        item.textContent = guestNameElement[i].textContent;
    });

    descriptionTextContent.textContent = descriptionText;

    if (songSrc) {
        playerBody.classList.add("active_player_body_wrap");
        videoBody.classList.remove("active_video_body_wrap");
        const img = playerBody.querySelector("img.set_cardImg");
        img.setAttribute("src", imgSrc);
        const audio = playerBody.querySelector("audio.setSongCard");
        audio.setAttribute("src", songSrc);
    } else {
        videoBody.classList.add("active_video_body_wrap");
        playerBody.classList.remove("active_player_body_wrap");
        const video = videoBody.querySelector("video.setVideoCard");
        video.setAttribute("src", videoSrc);
    }
}
