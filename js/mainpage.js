const mainSlider = new Swiper('.main-slider__container', {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next'
    }
})

let carTabsOptions = {
    tabGroupParentSelector: '.js-cartabs-parent', // Селектор родительского контейнера.
    tabBtnSelector: '.js-chapter-btn', // Селектор вкладки (таба).
    tabContentSelector: '.js-tab-typecontent', // Селектор контентного блока.
    activationClass: 'active', // CSS класс, активирующий видимость таба и соответствующей ему контентной области.
    defaultTabToShow: '.js-chapter-btn:nth-child(1)' // Псевдокласс или иной селектор, который однозначно укажет на вкладку, которая должна быть активна по умолчанию.
};

const carTab = new TabMaker(carTabsOptions);
carTab.createTabs();

const offersSlider = new Swiper('.offers__slider', {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    freeMode: true,
    spaceBetween: 32,
    slidesPerView: 'auto',
    roundLengths: true,
    observer: true,
    observeParents: true,
    navigation: {
        nextEl: '.offers__slider-next-button',
        prevEl: '.offers__slider-prev-button'
    }
})

let offersOptions = {
    tabGroupParentSelector: '.js-offers-parent', // Селектор родительского контейнера.
    tabBtnSelector: '.js-offer-tab', // Селектор вкладки (таба).
    tabContentSelector: '.js-offer-tabcontent', // Селектор контентного блока.
    activationClass: 'active', // CSS класс, активирующий видимость таба и соответствующей ему контентной области.
    defaultTabToShow: '.js-offer-tab:nth-child(1)' // Псевдокласс или иной селектор, который однозначно укажет на вкладку, которая должна быть активна по умолчанию.
};
const offersTabs = new TabMaker(offersOptions);
offersTabs.createTabs();


function moveDots(option) {
    const mainSliderImage = document.querySelector('.main-slider__image');
    const sliderBullets = document.querySelector('.main-slider .swiper-pagination-bullets');
    setTimeout(() => {
        sliderBullets.style.top = mainSliderImage.offsetHeight + (option) + 'px';
    }, 100)
}

function DotMoveController() {
    if (window.innerWidth > 1190 || document.body.clientWidth > 1190) {
        moveDots(-32)
    } else if ((window.innerWidth <= 1189 && window.innerWidth >= 768 ) || (document.body.clientWidth <= 1189 && document.body.clientWidth >= 768)) {
        moveDots(20)
    } else if (window.innerWidth < 768 || document.body.clientWidth < 768) {
        moveDots(-32)
    }
}

window.onload = function () {
    DotMoveController();
};

window.addEventListener('resize', function() {
    DotMoveController()
});