initBurger();
initTabs();

function initBurger() {
    const burger = document.querySelector(".burger_menu");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active");
        document.body.classList.toggle("body_lock");
    });
}

function initTabs() {
    const faqTabs = document.querySelector("#faqTabs");

    if (!faqTabs) return;

    const tabs = document.querySelectorAll(".tab_title"),
        tabsContent = document.querySelectorAll(".tab_content"),
        tabsParent = document.querySelector(".tab_wrapper"),
        closeItem = document.querySelectorAll(".open_status");

    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle("show");
        tabs[i].classList.toggle("tab_active");
        closeItem[i].classList.toggle("open_active");
    }

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tab_title")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    showTabContent(i);
                }
            });
        }
    });
}
