// Глобальные переменные
const myHtml = document.querySelector('html');

//Плавная навигация по сайту
const scrollPos = () => window.pageYOffset || document.documentElement.scrollTop,
    head_height = () => document.querySelector('.header').clientHeight,
    anchors = document.querySelectorAll('a[href^="#"]');

for (let anchor of anchors) {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href')
        let block = document.getElementById(blockID.substr(1, blockID.length - 1)); //#hid2

        window.scrollTo({
            top: block.offsetTop - head_height(),
            behavior: 'smooth'
        })
    })
}

let subscribe_button = document.querySelectorAll('.subscribe');
for (elem of subscribe_button) {
    elem.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: document.getElementById('contacts').offsetTop - head_height(),
            behavior: 'smooth'
        })
    })
}

//Мобильная навигация
; (function () {

    const navOpen = document.querySelector('.header__modal_menu'),
        navElem = document.querySelector('.mobile_modal_nav'),
        navHide = document.querySelectorAll('.mobile_modal_nav a,.mobile_modal_nav__close');

    navOpen.addEventListener('click', function () {
        navElem.classList.remove('hide');
        navElem.classList.add('show');
        myHtml.style.overflow = 'hidden';
        window.addEventListener('orientationchange', navClose);
        window.addEventListener('resize', navClose);
    });

    function navClose() {
        navElem.classList.remove('show');
        navElem.classList.add('hide');
        myHtml.style.overflow = 'auto';
        window.removeEventListener('orientationchange', navClose);
        window.removeEventListener('resize', navClose);
    }

    for (let el of navHide)
        el.addEventListener('click', navClose);

})();

//Подробнее о курсе
; (function () {

    const mOpen = document.querySelectorAll('[data-modal]'),
        modals = document.querySelectorAll('.course_modal'),
        mClose = document.querySelectorAll('[data-close]');
    let mScroll = 0;

    if (mOpen.length == 0) return;
    let mStatus = false;


    for (let el of mOpen) {
        el.addEventListener('click', function (e) {
            let modal = document.getElementById(el.getAttribute('data-modal'));

            modalShow(modal);
        });
    }


    for (let el of mClose) {
        el.addEventListener('click', modalClose);
    }
    document.addEventListener('keydown', modalClose);


    function checkBackgroundClick(event) {
        if (event.target.classList.contains('course_modal'))
            modalClose(event);
    }

    function modalShow(modal) {
        modal.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        modal.setAttribute('style', '');
        modal.classList.remove('hide');
        modal.classList.add('show');


        document.addEventListener("click", checkBackgroundClick);
        myHtml.style.overflow = 'hidden';
        mStatus = true;
    }

    function modalClose(event) {
        if (mStatus && (event.type != 'keydown' || event.keyCode === 27)) {
            for (let modal of modals) {
                modal.classList.remove('show');
                modal.classList.add('hide');
            }

            document.removeEventListener('click', checkBackgroundClick);
            myHtml.style.overflow = 'auto';
            mStatus = false;

            if (this.dataset != undefined && this.dataset.close == 'subscribe') {
                window.scrollTo({
                    top: document.getElementById('contacts').offsetTop,
                    behavior: 'smooth'
                })
            }
        }
    }
})();

//Спойлеры
let spo__head = document.querySelectorAll('.accordion__head');
for (var i = 0; i < spo__head.length; i++) {
    spo__head[i].addEventListener('click', function () {
        // this.parentNode.classList.toggle('accordion__active');

        if (this.parentNode.classList.contains('accordion__active')) {
            this.parentNode.classList.remove('accordion__active');
        }
        else {
            for (el of spo__head) {
                el.parentNode.classList.remove('accordion__active');
            }
            this.parentNode.classList.add('accordion__active');
        }
    })
}

//Соотношение сторон элементов
let ratio16_9 = document.querySelectorAll('.ratio16_9'),
    ratio3_2 = document.querySelectorAll('.ratio3_2')

//выравнивание тексте к левому краю в We Do
let we_do__items = document.querySelectorAll('.wedo__item>p');

function newsize() {
    //Соотношение сторон 16:9
    for (elem of ratio16_9) {
        let widt = elem.clientWidth;
        // elem.setAttribute("height", widt * 9 / 16);
        elem.style.height = `${widt * 9 / 16}px`;
    }
    //Соотношение сторон 3:2
    for (elem of ratio3_2) {
        let widt = elem.clientWidth;
        // elem.setAttribute("height", widt * 9 / 16);
        elem.style.height = `${widt * 2 / 3}px`;
    }
    //Фикс наезжания header на контент в.main
    document.querySelector('.main').style.paddingTop = `${head_height()}px`;

    // AOS.js

}

// Запуск
newsize();
AOS.init({
    // disable: true,
    startEvent: 'DOMContentLoaded',
    // offset: 50,
    delay: 0,
    duration: 400,
    once: true
});
window.addEventListener('resize', function () {
    newsize();
})