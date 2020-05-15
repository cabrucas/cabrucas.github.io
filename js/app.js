//main slider init
var mySwiper = new Swiper ('.mainpage-slider', {
    direction: 'horizontal',
    speed: 1500,
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: 1500,
    },
    disableOnInteraction: false,
})
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
var rellax = new Rellax('.rellax', {
    center: true,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  });

// инпуты

var regions = new Choices(document.getElementById('region-select'), {
    renderChoiceLimit: 5,
    noResultsText: 'Ничего не найдено',
    noChoicesText: 'Ничего нет',
    itemSelectText: '',
    shouldSort: true,
    shouldSortItems: true,
});
var cities = new Choices(document.getElementById('city-select'), {
    renderChoiceLimit: 5,
    noResultsText: 'Ничего не найдено',
    noChoicesText: 'Ничего нет',
    itemSelectText: '',
    shouldSort: true,
    shouldSortItems: true,
});