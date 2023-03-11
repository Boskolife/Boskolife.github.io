//Burger
const burger = document.querySelector(".burger_menu");
const menuBody = document.querySelector(".nav");
const phone = document.querySelector(".phone");

burger.addEventListener('click', () =>{
    menuBody.classList.toggle('menu_active');
    phone.classList.toggle('menu_active');
    burger.classList.toggle("burger_active");
    document.body.classList.toggle("body_lock");
});


//Tabs

const tabs = document.querySelectorAll('.tab_title'),
	  tabsContent = document.querySelectorAll('.tab_content'),
	  tabsParent = document.querySelector('.tab_wrapper');

	function showTabContent(i = 0) {
        tabsContent[i].classList.toggle('show');
        tabs[i].classList.toggle('tab_active');
    }
    
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tab_title')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    showTabContent(i);
                }
            });
		}
    });
    

