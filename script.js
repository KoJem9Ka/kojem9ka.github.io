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

        console.log(block);

        // if (scrollPos() > block.offsetTop)
        //     jmp = jmp - head_height;

        window.scrollTo({
            top: jmp - head_height,
            behavior: 'smooth'
        })
    })
}


//Соотношение сторон 16:9 у видео с ютуба
let videos = document.querySelectorAll('.ytvideo')

function newsize() {
    for (elem of videos) {
        let widt = elem.clientWidth;
        elem.setAttribute("height", widt * 9 / 16);
        // elem.style.height = `${widt * 9 / 16}px`;
    }
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