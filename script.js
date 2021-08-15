//Выезжающее меню
// var menubtn = document.querySelector('.header__menu');

//Плавная навигация по сайту
const scrollPos = () => window.pageYOffset || document.documentElement.scrollTop;
let head_height = document.querySelector('.header').clientHeight;
const anchors = document.querySelectorAll('a[href^="#"]');

for (let anchor of anchors) {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href')
        let block = document.getElementById(blockID.substr(1, blockID.length - 1)); //#hid2
        let jmp = block.offsetTop;

        // if (scrollPos() > block.offsetTop)
        //     jmp = jmp - head_height;

        window.scrollTo({
            top: jmp - head_height,
            behavior: 'smooth'
        })
    })
}

let subscribe_button = document.querySelectorAll('.subscribe');
for (elem of subscribe_button) {
    elem.addEventListener("click", function (event) {
        event.preventDefault();
        let block = document.getElementById('contacts');
        let jmp = block.offsetTop;
        window.scrollTo({
            top: jmp - head_height,
            behavior: 'smooth'
        })
    })
}


//Соотношение сторон 16:9
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


    //Соотношение сторон 3:2
    //выравнивание тексте к левому краю в We Do
    // for (item of we_do__items)
    //     item.style.maxWidth = `none`,
    //         item.style.minWidth = `none`
    // let minn = Infinity;
    // for (item of we_do__items)
    //     minn = Math.min(minn, Math.floor(item.clientWidth));
    // for (item of we_do__items)
    //     item.style.maxWidth = `${minn}px`,
    //         item.style.minWidth = `${minn}px`
}

newsize();
window.addEventListener('resize', function () {
    newsize();
})



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




// $('img.img-svg').each(function(){
//     var $img = $(this);
//     var imgClass = $img.attr('class');
//     var imgURL = $img.attr('src');
//     $.get(imgURL, function(data) {
//       var $svg = $(data).find('svg');
//       if(typeof imgClass !== 'undefined') {
//         $svg = $svg.attr('class', imgClass+' replaced-svg');
//       }
//       $svg = $svg.removeAttr('xmlns:a');
//       if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
//         $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
//       }
//       $img.replaceWith($svg);
//     }, 'xml');
//   });

// $(document).ready(function () {

//     $('.svg-inline').each(function () {

//         var $img = $(this),
//             imgURL = $img.attr('src'),
//             imgID = $img.attr('id');

//         $.get(imgURL, function (data) {
//             // Get the SVG tag, ignore the rest
//             var $svg = $(data).find('svg');
//             // Add replaced image's ID to the new SVG
//             if (typeof imgID !== 'undefined') {
//                 $svg = $svg.attr('id', imgID);
//             }

//             $svg = $svg.removeAttr('xmlns:a');
//             $img.replaceWith($svg);
//         }, 'xml');
//     });
// });