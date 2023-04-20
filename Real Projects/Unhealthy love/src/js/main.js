initSwiper();
initBurger();
findHref();
initContactPopup();
playAudio();
// initMainVideo();


function initSwiper() {
    function destroySlidersOnResize(selector, width, obj, moreThan) {
        const init = {
            ...obj,
        };

        const win = window;
        const sliderSelector = document.querySelector(selector);
        if(!sliderSelector){
            return
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
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
        },
    });
    
    destroySlidersOnResize(".blog_swiper", 9999, {
        slidesPerView: 1,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
        },
    });

    destroySlidersOnResize(".tab_swiper", 9999, {
        slidesPerView: 2,
        spaceBetween: 10,
        grabCursor: true,
        grid: {
            rows: 3,
            fill: "row",
        },
        breakpoints: {
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
    
    destroySlidersOnResize(".tab_post_swiper", 9999, {
        slidesPerView: 1,
        spaceBetween: 10,
        grabCursor: true,
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
    const poupBtn = document.querySelector(".popup_btn");
    const closeBtn = document.querySelector(".close_item");

    poupBtn.addEventListener("click", () => {
        popupBody.classList.add("popup_active");
        popupContainer.classList.add("cont_active");
        document.body.classList.add("popup_lock");
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

    if (video.paused) {
        video.play();
        videoBTn.style = "display:none";
        video.setAttribute("controls", "");
    }
}

function initMainVideo() {
    const mainVideo = document.querySelector(".main_video");
    const soundBtn = document.querySelector(".sound_btn");
    const srcBtn = document.querySelector(".btn_src");

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

    soundBtn.addEventListener("click", () => {
        const isMuted = mainVideo.classList.contains("muted");

        if (isMuted) {
            unmuteVideo();
        } else {
            muteVideo();
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

function openTabEpisode(evt, tabName) {
    // Скрыть все табы
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Убрать класс "active" со всех вкладок
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
            " active_tab",
            ""
        );
    }

    // Показать нужный таб и сделать соответствующую вкладку активной
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active_tab";
}

function openTabPost(evt, tabName) {
    // Скрыть все табы
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Убрать класс "active" со всех вкладок
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
            " active_tab",
            ""
        );
    }

    // Показать нужный таб и сделать соответствующую вкладку активной
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active_tab";
}


function openArticlePost() {
    const openArticleBtn= document.querySelector('.open_article');
    if(!openArticleBtn){
        return
    }
    const blogTitle= document.querySelector('.blog_page_title');
    const returnBtn= document.querySelector('.returnBlog');
    const blogPage= document.querySelector('.blog_page');
    const post = document.getElementById('post');
    const postList = document.getElementById('post_list');

    function openPost() {
        post.classList.add('current_post');
        postList.classList.add('hidden_list');
        blogTitle.classList.add('hidden_title');
        returnBtn.classList.add('active_return');
        blogPage.classList.add('hide_page');

    }
    function closePost() {
        post.classList.remove('current_post');
        postList.classList.remove('hidden_list');
        blogTitle.classList.remove('hidden_title');
        returnBtn.classList.remove('active_return');
        blogPage.classList.remove('hide_page');
    }

    openArticleBtn.addEventListener('click', (e) => {
        openPost();
    });

    returnBtn.addEventListener('click', () => {
        closePost();
    });

}

openArticlePost();