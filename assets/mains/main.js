// Глобальные переменные
const myHtml = document.querySelector('html');
const loader = `<div class="loading_container"> <div class="loading_box"></div> </div>`;

//Прокрутка фона курсов только при его видимости
//Загрузка iframe'ов в последнюю очередь
window.addEventListener('load', function () {

    var isScrolling = false;
    function throttleScroll(e) {
        if (isScrolling == false) {
            window.requestAnimationFrame(function () {
                scrolling(e);
                isScrolling = false;
            });
        }
        isScrolling = true;
    }
    window.addEventListener("scroll", throttleScroll, false);

    function isWillVisible(elem) {
        var el = elem.getBoundingClientRect();
        return (window.innerHeight - el.top > -500)
    }

    function isPartiallyVisible(elem) {
        var el = elem.getBoundingClientRect();
        return ((el.top + el.height >= 0) && (el.height + window.innerHeight >= el.bottom));
    }

    //iframes
    let lazyElements = document.querySelectorAll('.ytvideo,.contacts .yamap');
    for (el of lazyElements) el.classList.add('lazyElem');
    //фон курсов
    const courses = document.querySelector('#courses');
    //функция при скроллинге
    function scrolling() {
        //фон курсов
        if (isPartiallyVisible(courses)) {
            if (courses.classList.contains('disbl'))
                courses.classList.remove('disbl');
        } else
            if (!courses.classList.contains('disbl'))
                courses.classList.add('disbl');
        //iframes
        for (el of lazyElements) {
            if (isWillVisible(el)) {
                el.classList.remove('lazyElem');
                let pasting = loader;
                if (el.classList.contains('ytvideo'))
                    pasting += `<iframe style="display: none;" class="ytvideo__inner" src="https://www.youtube.com/embed/${el.dataset.youtube}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                else if (el.classList.contains('yamap'))
                    pasting += `<iframe style="display: none;" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad052e78156846c8a92d869fcec3cf12dc4b6c8f0663fa9493b0f392d0be683ee&amp"></iframe>`;
                el.innerHTML = pasting;
                el.querySelector('iframe').addEventListener('load', function () {
                    this.parentNode.querySelector('.loading_container').outerHTML = '';
                    this.setAttribute('style', '');
                })
                lazyElements = document.querySelectorAll('.lazyElem');
            }
        }
    };
    scrolling();
})


//Открытие окна формы заявки
const subscribe = document.querySelector('.subscribe'),
    subscr_open_btns = document.querySelectorAll('[data-subscr_btn]'),
    subscr_close_btn = document.querySelector('.subscribe__close');
const subscr_iframes = document.querySelectorAll('.subscribe .yamap, .subscribe .subscribe__frame');
let subscr_iframes_needload = true;

for (el of subscr_open_btns)
    el.addEventListener('click', function () {
        myHtml.style.overflow = 'hidden';
        subscribe.classList.remove('hide');
        subscribe.classList.add('show');
        subscribe.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        //Подгрузка iframe'ов
        if (subscr_iframes_needload) {
            subscr_iframes_needload = false;

            for (el of subscr_iframes) {
                let pasting = loader;
                if (el.classList.contains('yamap'))
                    pasting += `<iframe style="display: none;" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad052e78156846c8a92d869fcec3cf12dc4b6c8f0663fa9493b0f392d0be683ee&amp"></iframe>`;
                else if (el.classList.contains('subscribe__frame'))
                    pasting += `<iframe id="goglform" src="https://docs.google.com/forms/d/e/1FAIpQLSdK4ZXc_llgDowq7SpYI2vUJSZFdGU6ymmBDVHZep6hm502pQ/viewform?embedded=true"></iframe>`;

                el.innerHTML = pasting;

                el.querySelector('iframe').addEventListener('load', function () {
                    this.parentNode.querySelector('.loading_container').outerHTML = '';
                    this.setAttribute('style', '');
                })
            }
        }

        newsize();
    });

subscr_close_btn.addEventListener('click', function () {
    myHtml.style.overflow = 'auto';
    subscribe.classList.remove('show');
    subscribe.classList.add('hide');
});

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
        }
    }
})();

//Спойлеры
function accordionShow(elem) {
    elem.classList.add('active');
    const elemContent = elem.querySelector('.accordion__content');
    elemContent.style.maxHeight = `${elemContent.scrollHeight}px`;
}

function accordionHide(elem) {
    elem.classList.remove('active');
    elem.querySelector('.accordion__content').style.maxHeight = 0;
}

let accordiones = document.querySelectorAll('.accordion');
for (var i = 0; i < accordiones.length; i++) {

    const cur_acc = accordiones[i];

    cur_acc.querySelector('.accordion__head').addEventListener('click', function () {
        if (cur_acc.classList.contains('active'))
            accordionHide(cur_acc);
        else {
            for (el of accordiones)
                accordionHide(el);
            accordionShow(cur_acc);
        }
    })
}

//Соотношение сторон элементов
let ratio16_9 = document.querySelectorAll('.ratio16_9'),
    ratio3_2 = document.querySelectorAll('.ratio3_2');

console.log(ratio3_2);

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

    // Обновление размера спойлера при изменении размера окна
    for (el of accordiones) {
        if (el.classList.contains('active'))
            accordionShow(el);
    }
}

// Запуск
newsize();
AOS.init({
    startEvent: 'DOMContentLoaded',
    delay: 0,
    duration: 400,
    once: true
});
window.addEventListener('resize', function () {
    newsize();
})