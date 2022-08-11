"use strict";

window.addEventListener("DOMContentLoaded", () => {
    // TABS
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.style.display = "none";
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) =>{
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // TIMER

    const deadline = '2022-07-11';
    

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (t <=0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else {
            days = Math.floor( (t / (1000 * 60 * 60 * 24)) );
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor( (t / 1000 / 60) % 60);
            seconds = Math.floor( (t/ 1000) % 60);
        }
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minute': minutes,
                'seconds': seconds
            };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeIntervals = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minute);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeIntervals);
            }
        }
    }

    setClock('.timer', deadline);

    // MODAL

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });


    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    modalCloseBtn.addEventListener('click', closeModal); // ---> TRIGGER CLOSE
    modal.addEventListener('click', (event) => {
        if(event.target === modal) {
            closeModal();
        }
    }); // ---> EMPTY PLACE
    document.addEventListener('keydown', (e) => {
        if (e.code ==='Escape') {
            closeModal();
        }
    }); //  ---> ESCAPE

    //const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


    // BLOCK MENU

    
    class Menu {
        constructor(src,alt,tittle,descr,price,parentSelector, ...clases){
            this.src = src;
            this.alt = alt;
            this.tittle = tittle;
            this.clases =clases;
            this.descr = descr;
            this.price = price;
            this.transfer = 35;
            this.parent = document.querySelector(parentSelector);
            this.changetoUAN();
        }
        changetoUAN() {
            this.price = this.price * this.transfer;
        }
        render() {
            const item = document.createElement('div');
            if (this.clases.length === 0) {
                this.item = 'menu__item';
                item.classList.add(this.item);
            }else{
                this.clases.forEach(className => item.classList.add(className));
            }
            item.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.tittle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(item);
        }
    }
    new Menu("img/tabs/post.jpg",
        "vegan",
        "'Меню Постное'",
        "Меню Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        9,
        '.menu .container',
        ).render();
        new Menu("img/tabs/post.jpg",
        "vegan",
        "'Меню Постное'",
        "Меню Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        9,
        '.menu .container',
    ).render();
        new Menu("img/tabs/post.jpg",
        "vegan",
        "'Меню Постное'",
        "Меню Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        9,
        '.menu .container',
    ).render();
});


