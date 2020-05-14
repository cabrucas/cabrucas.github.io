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
    animationTime    : 1000, // [ms]
    stepSize         : 100, // [px]
    accelerationDelta : 20,  // 50
    accelerationMax   : 2,   // 3
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