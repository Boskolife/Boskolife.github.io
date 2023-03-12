initTabs();
initBurger();
initNavBtn();
findHref();

function findHref() {
    let element = document.getElementById('menu').getElementsByTagName('a');
    let url = window.location.href;
    for (let i = 0; i < element.length; i++) {
        console.log(element);
        if(url === element[i].href) {
            element[i].classList.add('item_active')
        }
    };
}

function initBurger() {
    const burger = document.querySelector(".burger_menu");
    const menuBody = document.querySelector(".nav");
    const phone = document.querySelector(".phone");
    
    burger.addEventListener('click', () =>{
        menuBody.classList.toggle('menu_active');
        phone.classList.toggle('menu_active');
        burger.classList.toggle("burger_active");
        document.body.classList.toggle("body_lock");
    });
}

function initTabs() {
    const faqTabs = document.querySelector('#faqTabs');

    if (!faqTabs) return;

    const tabs = document.querySelectorAll('.tab_title'),
    tabsContent = document.querySelectorAll('.tab_content'),
    tabsParent = document.querySelector('.tab_wrapper');

    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle('show');
        tabs[i].classList.toggle('tab_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tab_title')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    showTabContent(i);
                }
            });
        }
    });

    !window.location.href.includes('faq') && showTabContent();
}

function initNavBtn() {
    const flyBtn = document.querySelector('#flyBtn');
    const flyBtn_2 = document.querySelector('#flyBtn_2');

    if (!flyBtn && !flyBtn_2) return;

    const navBtn = document.querySelector('.nav_btn'),
          navTable = document.querySelector('.nav_table'),
          navLink = document.querySelectorAll('.nav_table_link');
  
    navBtn.addEventListener('click', () => {
        navTable.classList.toggle('show_table');
        document.body.classList.toggle("body_lock");
    });

    navLink.forEach(item => {
        item.addEventListener('click', () => {
            navTable.classList.remove('show_table');
            document.body.classList.remove("body_lock");
        })
    });

    ScrollTrigger.create({
        trigger: "#flyBtn_2",
        start: "top top",
        endTrigger: "#otherID",
        end: "bottom 50%+=100px",
        onToggle: self => console.log("toggled, isActive:", self.isActive),
        onUpdate: self => {
          console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        }
      });
}





