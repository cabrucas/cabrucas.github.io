// слайдер главной страницы
const mainExists = document.getElementsByClassName('mainpage-slider') || [];
if (mainExists.length > 0) {
    var mySwiper = new Swiper ('.mainpage-slider', {
        direction: 'horizontal',
        speed: 1500,
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 1500,
        },
        disableOnInteraction: false,
    });
};

// слайдер схемы работы на странице партнеров
const schemeExists = document.getElementsByClassName('scheme-slider') || [];
if(schemeExists.length > 0) {
  var schemeSlider = new Swiper ('.scheme-slider', {
    direction: 'horizontal',
    speed: 700,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
});
}

// анимации при скролле
sal({
    threshold: 0.01,
    once: false,
});

// плавный скролл
SmoothScroll({
    animationTime    : 400, // [ms]
    stepSize         : 100, // [px]
    accelerationDelta : 50,  // 50
    accelerationMax   : 3,   // 3
    keyboardSupport   : true,  // option
    arrowScroll       : 50,    // [px]
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,
  
    touchpadSupport   : false,
    fixedBackground   : true, 
    excluded          : ''    
  });
  
// параллакс 
function ParallaxMovement() {
    const rellax = new Rellax('.rellax', {
        center: true,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false
      });
}

ParallaxMovement();

// инпуты прайс-листа
let regions = document.getElementById('region-select') || [];
if (regions.length > 0) {
    regions = new Choices(document.getElementById('region-select'), {
      renderChoiceLimit: 5,
      noResultsText: 'Ничего не найдено',
      noChoicesText: 'Ничего нет',
      itemSelectText: '',
      shouldSort: true,
      shouldSortItems: true,
    });
}

let cities = document.getElementById('city-select') || [];
if(cities.length > 0) {
  cities = new Choices(document.getElementById('city-select'), {
    renderChoiceLimit: 5,
    noResultsText: 'Ничего не найдено',
    noChoicesText: 'Ничего нет',
    itemSelectText: '',
    shouldSort: true,
    shouldSortItems: true,
  });
}

// бургер
const burgerMenu = document.getElementById('burgerMenu') || false;
const burgerMenuStripes = document.getElementById('burgerMenuStripes') || false;
const dropperPart = document.getElementById('dropperPart') || false;
const dropperDarkener = document.getElementById('dropper-darkener') || false;
const dropperSection = document.getElementById('dropperSection') || false;
if (burgerMenu) {
    burgerMenu.onclick = function() {
    dropperSection.classList.toggle('clickable');
    dropperDarkener.classList.toggle('darken');
    burgerMenu.classList.toggle('burger--pressed')
    burgerMenuStripes.classList.toggle('burger__menu--pressed');
    dropperPart.classList.toggle('show');
  }
}