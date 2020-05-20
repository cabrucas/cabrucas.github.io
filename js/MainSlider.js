function MainSlider() {
    var mySwiper = new Swiper ('.mainpage-slider', {
        direction: 'horizontal',
        speed: 1500,
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 1500,
        },
        disableOnInteraction: false,
    }) || [];
};
MainSlider();