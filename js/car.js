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
