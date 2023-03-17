initTabs();
initBurger();
initNavBtn();
findHref();
getMonth();
getYear();
getDay();
hideText();
calcPages();

function findHref() {
    let element = document.getElementById("menu").getElementsByTagName("a");
    let url = window.location.href;
    for (let i = 0; i < element.length; i++) {
        if (url === element[i].href) {
            element[i].classList.add("item_active");
        }
    }
}

function initBurger() {
    const burger = document.querySelector(".burger_menu");
    const menuBody = document.querySelector(".nav");

    document.addEventListener("click", function (event) {
        if (burger.contains(event.target)) {
            menuBody.classList.toggle("menu_active");
            burger.classList.toggle("burger_active");
            document.body.classList.toggle("body_lock");
            return;
        }
        if (!menuBody.contains(event.target)) {
            menuBody.classList.remove("menu_active");
            burger.classList.remove("burger_active");
            document.body.classList.remove("body_lock");
        }
    });
}

function initTabs() {
    const faqTabs = document.querySelector("#faqTabs");

    if (!faqTabs) return;

    const tabs = document.querySelectorAll(".tab_title"),
        tabsContent = document.querySelectorAll(".tab_content"),
        tabsParent = document.querySelector(".tab_wrapper");

    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle("show");
        tabs[i].classList.toggle("tab_active");
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

    !window.location.href.includes("faq") && showTabContent();
}

function initNavBtn() {
    const flyBtn = document.querySelector("#flyBtn");

    if (!flyBtn) return;

    const navBtn = document.querySelector(".nav_btn"),
        navTable = document.querySelector(".nav_table"),
        navLink = document.querySelectorAll(".nav_table_link"),
        footer = document.querySelector("#footer");

    navBtn.addEventListener("click", () => {
        navTable.classList.toggle("show_table");
        document.body.classList.toggle("body_lock");
    });

    navLink.forEach((item) => {
        item.addEventListener("click", () => {
            navTable.classList.remove("show_table");
            document.body.classList.remove("body_lock");
        });
    });

    ScrollTrigger.create({
        trigger: ".nav_table",
        start: "-90px top",
        endTrigger: "#footer",
        toggleClass: "fixed",
        end: "top 80%+=100px",
        onLeave: (self) => {
            self.trigger.classList.add("fixBottom");
            // self.trigger.style.bottom = `${footer.clientHeight + 50}px`;
        },
        onEnterBack: (self) => {
            self.trigger.classList.remove("fixBottom");
        },
    });

    ScrollTrigger.create({
        trigger: "#flyBtn",
        start: "top bottom",
        endTrigger: "#footer",
        toggleClass: "active",
        end: "top bottom",
        onLeave: (self) => {
            self.trigger.classList.add("hide");
        },
        onEnterBack: (self) => {
            self.trigger.classList.remove("hide");
        },
    });
}

function hideText() {
    const spoiler = document.querySelector(".spoiler");
    const button = document.querySelector(".spoiler-button");

    button.textContent = "Show more";

    function replaceText() {
        if (button.textContent === "Show more") {
            button.textContent = "Show less";
            document.querySelector(".dots").style.display = "none";
            button.style.display = "block";
        } else {
            button.textContent = "Show more";
            document.querySelector(".dots").style.display = "inline";
            button.style.display = "inline";
        }
    }

    button.addEventListener("click", function () {
        spoiler.classList.toggle("show");
        replaceText();
    });
}

function getDay() {
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");
  const daySelect = document.getElementById("day-select");

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const populateDays = () => {
    const month = parseInt(monthSelect.value, 10);
    const year = parseInt(yearSelect.value, 10);
    const days = daysInMonth(month, year);

    daySelect.innerHTML = "";

    for (let day = 1; day <= days; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.text = day;
      daySelect.appendChild(option);
    }

    daySelect.querySelector("option:first-child").selected = true;
  };

  populateDays();

  monthSelect.addEventListener("change", populateDays);
  yearSelect.addEventListener("change", populateDays);
}

function getMonth() {
  const select = document.getElementById("month-select");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  months.forEach((month, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.text = month;
    select.appendChild(option);
  });

  select.options[0].selected = true;
}

function getYear() {
  const select = document.getElementById("year-select");
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 2;
  const startYear = 2000;

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    select.appendChild(option);
  }

  select.querySelector(`option[value='2000']`).selected = true;
}

function calcPages() {
    const firstBtn = document.getElementById('second_next');
    const secondBtn = document.getElementById('third_next');
    const startOverBtn = document.getElementById('start_over');
    const firstStep = document.getElementById('first_step');
    const secondStep = document.getElementById('second_step');
    const thirdStep = document.getElementById('third_step');
    const stepOne = document.getElementById('step_one');
    const stepTwo = document.getElementById('step_two');
    const amountInput = document.querySelector('#summ');
    const monthSelect = document.getElementById("month-select");
    const yearSelect = document.getElementById("year-select");
    const daySelect = document.getElementById("day-select");
    const awardEl = document.querySelector('#award');
    const interestRateEl = document.querySelector('#interestRate');
    const totalEl = document.querySelector('#total');

    let monthValue = monthSelect.value;
    let yearValue = yearSelect.value;
    let dayValue = daySelect.value;
    const getInputDate = () => new Date(yearValue, monthValue, dayValue);
    let fullYear = getInputDate();
    let amountValue = '';
    let result;

    firstBtn.addEventListener("click", (e) => {
        e.preventDefault();
        firstStep.classList.remove("step_show");
        secondStep.classList.add("step_show");
        stepOne.classList.remove("active_wrap");
        stepTwo.classList.add("active_wrap");

    });

    secondBtn.addEventListener("click", (e) => {
        e.preventDefault();
        secondStep.classList.remove('step_show')
        thirdStep.classList.add('step_show');
        fullYear = getInputDate();
        result = nyJudgmentInterest(+amountValue, fullYear);
        awardEl.textContent = `$${Number.parseFloat(amountValue).toFixed(2)}`;
        interestRateEl.textContent = `$${result.interest}`;
        totalEl.textContent =`$${result.totalValue}`
    })

    startOverBtn.addEventListener("click", (e) => {
        e.preventDefault();
        thirdStep.classList.remove('step_show')
        firstStep.classList.add('step_show');
        amountInput.value = '';
    })

    amountInput.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[a-zA-Z]/g, '')
        e.target.value = value;
        amountValue = value;
    })
    monthSelect.addEventListener('change', (e) => {
        monthValue = e.target.value;
    })
    yearSelect.addEventListener('change', (e) => {
        yearValue = e.target.value;
    })
    daySelect.addEventListener('change', (e) => {
        dayValue = e.target.value;
    })
}

function nyJudgmentInterest(judgmentAmount, judgmentDate) {
    const beforeApril30Rate = 0.0075; // 0.75% interest rate before April 30, 2022
    const afterApril30Rate = 0.02; // 2% interest rate after April 30, 2022
    const april30Date = new Date('2022-04-30'); // date when interest rate changes
  
    // Calculate the number of months between the judgment date and April 30, 2022
    const months = (april30Date.getFullYear() - judgmentDate.getFullYear()) * 12 + (april30Date.getMonth() - judgmentDate.getMonth());
  
    // Determine the interest rate based on the judgment date
    const rate = judgmentDate < april30Date ? beforeApril30Rate : afterApril30Rate;
  
    // Calculate the total interest earned
    const interest = judgmentAmount * rate * months;
  
    // Calculate the total value of the judgment including interest
    const totalValue = judgmentAmount + interest;

    return { interest, totalValue };
}

// console.log(nyJudgmentInterest(100, new Date(2022, 0, 1)))