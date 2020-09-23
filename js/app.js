// const { default: Swiper } = require("swiper")

/* Мобильное меню */
const burgerMenuButton = document.querySelector('.header__mobile-menu') || false
const mobileMenuCollection = document.querySelector('.mob-dropper') || false
const mobileMenuList = document.querySelector('.mob-dropper__menu') || false
const mobileMenuDarkener = document.querySelector('.mob-dropper__darkener') || false
const mobileMenuCloser = document.querySelector('.mob-dropper__close') || false
let menuIsOpen = false

function mobileMenuOpen() {
    mobileMenuCollection.classList.add('mob-dropper--active')
    mobileMenuDarkener.classList.add('mob-dropper__darkener--active')
    mobileMenuList.classList.add('mob-dropper__menu--active')
    mobileMenuCloser.classList.add('mob-dropper__close--active')
    menuIsOpen = true
}

function mobileMenuClose() {
    mobileMenuList.classList.remove('mob-dropper__menu--active')
    mobileMenuDarkener.classList.remove('mob-dropper__darkener--active')
    mobileMenuCloser.classList.remove('mob-dropper__close--active')
    setTimeout(() => {
        mobileMenuCollection.classList.remove('mob-dropper--active')
    }, 500)
}

if (burgerMenuButton) {
    burgerMenuButton.addEventListener('click', () => {
        mobileMenuOpen()
    })    
    mobileMenuCollection.addEventListener('click', () => {
        if(event.target.dataset.close == 'true') {
            mobileMenuClose()
        }
    })
}

const mainMenu = document.querySelector('.js-hide') || false
if (mainMenu) {
    let lastScrollTop = 0
    window.addEventListener("scroll", () => {
    let nextScrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (nextScrollTop > lastScrollTop){
        mainMenu.classList.add('js-hide--hidden')
    } else {
        mainMenu.classList.remove('js-hide--hidden')
    }
    lastScrollTop = nextScrollTop <= 0 ? 0 : nextScrollTop
    }, false)
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape && menuIsOpen) {
        mobileMenuClose()
    }
};

// Слайдер главной страницы

let mainSlider = new Swiper('.main-slider', {
    direction: 'horizontal',
    loop: true,
    speed: 750,
    spaceBetween: 0,
    slidesPerView: 1,
    roundLengths: true,
    autoHeight: true,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
}) || false

// Исправление бага с анимацией лучей в плитках на главной странице

let raysList = document.getElementsByClassName('js-hoverBlock') || false
if (raysList) {
    let buildingTilesList = document.getElementsByClassName('js-animatedTile')
    for (let buildingTile of buildingTilesList) {
        for (let raysBlock of raysList) {
            buildingTile.addEventListener('mouseleave', ()=> {
                raysBlock.classList.add('js-rays')
                setTimeout(()=>{
                    raysBlock.classList.remove('js-rays')
                }, 100)
            })
        }
    }
}

// Слайдер на главной странице посреди плиток ЖК

let contentSlider = new Swiper('.content-slider', {
    loop: true,
    speed: 750,
    spaceBetween: 32,
    slidesPerView: 1,
    roundLengths: true,
    pagination: {
        el: '.swiper-pagination',
    }
}) || false

/* Рендж инпуты */

const firstPaymentSlider = document.getElementById('firstPaymentSlider') || false
const firstPaymentValue = document.getElementById('first-payment') || false
const creditPeriod = document.getElementById('credit-years') || false
const totalFlatPriceInput = document.getElementById('flat-price') || false

if(totalFlatPriceInput) {

    creditPeriod.value = mortgageCalc.defaultCreditPeriod + " лет"
    creditPeriod.addEventListener('click', function() {
        this.value = ''
    })
   

    let totalFlatPrice = mortgageCalc.defaultFlatPrice || false
    noUiSlider.create(firstPaymentSlider, {
        start: 0,
        connect: 'lower',
        range: {
            'min': 0,
            'max': totalFlatPrice
        }
    })
  
    totalFlatPriceInput.addEventListener('keyup', ()=> {
        let tmp = totalFlatPriceInput.value
        if(typeof tmp === 'string') {
            if (typeof tmp === 'nan' || tmp === '' || tmp === null) {
                tmp = mortgageCalc.defaultFlatPrice
            }
            totalFlatPrice = tmp
            console.log(totalFlatPrice)
            firstPaymentSlider.noUiSlider.set(totalFlatPrice * 0.1)
            firstPaymentSlider.noUiSlider.updateOptions({
                range: {
                    'min': parseFloat(totalFlatPrice, 10) * 0.1,
                    'max': parseFloat(totalFlatPrice, 10)
                }
            })
        }
        firstPaymentValue.value =''
    })    

    firstPaymentSlider.noUiSlider.on('update', function (values, handle) {
        if (handle === 0) {
            let tempValue = parseInt(values[handle], 10)
            if (tempValue === 0) {
                firstPaymentValue.value = 'Укажите сумму'
            } else {
                firstPaymentValue.value = tempValue.toLocaleString()
            }
        }
    })

    firstPaymentValue.addEventListener('change', function () {
        firstPaymentSlider.noUiSlider.set(this.value);
    })

    firstPaymentValue.addEventListener('click', function () {
        this.value = "";
    })
}

// Валидация некоторых форм странице

const validationList = document.querySelectorAll('[data-calcValid]') || false

if (validationList.length > 0) {
    const agreement = document.querySelector('.checkbox__input')
    const calcButton = document.querySelector('[data-valid-button]')
    calcButton.disabled = 'true'

    agreement.addEventListener('click', function(){
        for (let inputObject of validationList) {
            if (agreement.checked == true && inputObject.value != "") {
                calcButton.disabled = false
            }
            else {
                calcButton.disabled = true
            }
        }
    })    

    for (let inputObject of validationList) {
        inputObject.onkeyup = function () {
            if (inputObject.value != "" && agreement.checked == true) {
              calcButton.disabled = false
            }
            else {
              calcButton.disabled = true
            }
        }
    }
}

// Телефонные маски
let phonemaskInputsList = document.querySelectorAll('[data-phonemask]') || false
if (phonemaskInputsList) {

    let maskOptions = {
        mask: '{+7} 000 000-00-00'
    }

    for (let phonemaskElement of phonemaskInputsList) {
        let phoneMask = IMask(phonemaskElement, maskOptions)
    }
}

// Слайдер страницы команды

let teamPageSlider = new Swiper('.team-slider', {
    direction: 'horizontal',
    loop: false,
    speed: 750,
    spaceBetween: 0,
    slidesPerView: 'auto',
    roundLengths: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
}) || false

// Карта в Контактах
let mapBlock = document.querySelector('#jsContactsMap') || false
const coordinatesMapData = {
    krd: [45.055614, 38.956368],
    nvrsk: [44.672661, 37.774616]
}
let myMap = null

function mapInit () {
    myMap = new ymaps.Map("jsContactsMap", {
        center: mapCenter,
        zoom: 12,
        controls: ['smallMapDefaultSet']
      }),
  
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
  
      myPlacemark = new ymaps.Placemark([45.045521, 38.992965], {
          hintContent: 'Офис продаж СК «Семья»',
          balloonContent: 'СК «Семья», ул. Колхозная, 5'
      }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/assets/map-small.svg',
          iconImageSize: [24, 24],
          iconImageOffset: [-12, -12]
      }),
  
      myPlacemarkKP = new ymaps.Placemark([45.078467, 38.895650], {
          hintContent: 'Офис продаж СК «Семья»',
          balloonContent: 'СК «Семья», ул. Красных Партизан, 1/3'
      }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/assets/map-small.svg',
          iconImageSize: [24, 24],
          iconImageOffset: [-12, -12]
      }),
  
      myPlacemarkWithContent = new ymaps.Placemark([45.055614, 38.956368], {
          hintContent: 'Головной офис СК «Семья»',
          balloonContent: 'Головной офис, ул. Воровского, 172',
          iconContent: ''
      }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: 'img/assets/map-head.svg',
          iconImageSize: [36, 41],
          iconImageOffset: [-18, -20],
          iconContentOffset: [0, 0],
          iconContentLayout: MyIconContentLayout
      });
  
      myPlacemarkWithContentNVRSK = new ymaps.Placemark(coordinatesMapData.nvrsk, {
          hintContent: 'Офис СК «Семья» в Новороссийске',
          balloonContent: 'г. Новороссийск, ул. Котанова, 6',
          iconContent: ''
      }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: 'img/assets/map-head.svg',
          iconImageSize: [36, 41],
          iconImageOffset: [-18, -20],
          iconContentOffset: [0, 0],
          iconContentLayout: MyIconContentLayout
      });
  
      myMap.geoObjects
          .add(myPlacemark)
          .add(myPlacemarkWithContent)
          .add(myPlacemarkKP)
          .add(myPlacemarkWithContentNVRSK);
    
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.enable('multiTouch');

    window.mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    if (mobileAndTabletCheck()) {
        myMap.behaviors.disable('drag');
    }
}

if(mapBlock) {
    mapCenter = coordinatesMapData.krd
    ymaps.ready(mapInit)
}

let collection = document.getElementsByClassName('js-tabBtn') || false
if (collection) {
    document.addEventListener('click', function() {
        if (event.target.dataset.city === "krd") {
            event.preventDefault()
            myMap.panTo(coordinatesMapData.krd, 14)
        } else if (event.target.dataset.city === 'nvrsk') {
            event.preventDefault()
            myMap.panTo(coordinatesMapData.nvrsk, 14)
        }
    })
}

// Табы в Контактах
const tabExist = document.querySelector('.js-tabBtn') || false

if (tabExist) {
  document.querySelector('.js-tabBtn').classList.add('js-tabBtn--active') || false;
  document.querySelector('.js-tabContent').classList.add('js-tabContent--active') || false;
  let btnList = document.querySelectorAll('.js-tabBtn') || false;
  let contentList = document.querySelectorAll('.js-tabContent') || false;

  btnList.forEach(function (element, index) {
      element.addEventListener('click', function () {        
          btnList.forEach(function (item) {
              item.classList.remove('js-tabBtn--active');
          })
          contentList.forEach(function (item) {
              item.classList.remove('js-tabContent--active');
          })        
          btnList.item(index).classList.add('js-tabBtn--active')
          contentList.item(index).classList.add('js-tabContent--active')
          event.preventDefault();
      }, false);
  });
}

const genPlan = document.getElementById('genplan') || false
if(genPlan) {    
    const defaults = {
        // type content: `image` - only one image, `html` - any HTML content
        type: 'html',
        // for type `image` computed auto (if width set null), for type `html` need set real html content width, else computed auto
        width: null,
        // for type `image` computed auto (if height set null), for type `html` need set real html content height, else computed auto
        height: null,
        // drag scrollable image
        dragScrollable: true,
        // options for the DragScrollable module
        dragScrollableOptions: {
            // smooth extinction moving element after set loose
            smoothExtinction: false,
            // callback triggered when grabbing an element
            onGrab: null,
            // callback triggered when moving an element
            onMove: null,
            // callback triggered when dropping an element
            onDrop: null
        },
        // minimum allowed proportion of scale
        minScale: 0.55,
        // maximum allowed proportion of scale
        maxScale: 1.5,
        // image resizing speed
        speed: 10
    }

    let wzoom = WZoom.create('#genplan', defaults)

    window.addEventListener('resize', function () {
        wzoom.prepare();
    });
}

// Слайдер галереи в карточке ЖК

let gallerySlider = new Swiper('.gallery__slider', {
    direction: 'horizontal',
    loop: true,
    speed: 750,
    spaceBetween: 1,
    slidesPerView: 'auto',
    roundLengths: true,
    autoHeight: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    observer: true,
    observeParents: true
}) || false

// Ход строительства

let processSlider = new Swiper('.process__slider', {
    direction: 'horizontal',
    loop: false,
    speed: 750,
    spaceBetween: 1,
    slidesPerView: 'auto',
    roundLengths: true,
    autoHeight: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    observer: true,
    observeParents: true
}) || false

if(processSlider) {
    const anchorsList = document.querySelectorAll('[data-slidenum]')
    for (let anchor of anchorsList) {
        anchor.addEventListener('click', function() {
            let slideIndexData = parseInt(event.target.dataset.slidenum, 10) ;
            processSlider.slideTo(slideIndexData)
        })
    }    
}

// Карта в карточке

let smallMapBlock = document.querySelector('#jsContactsMapSmall') || false
let smallMap = null

function smallMapInit () {
    smallMap = new ymaps.Map("jsContactsMapSmall", {
        center: mapCenter,
        zoom: 12,
        controls: ['smallMapDefaultSet']
      }),
  
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
  
      complexMark = new ymaps.Placemark([45.055614, 38.956368], {
          hintContent: 'Головной офис СК «Семья»',
          balloonContent: 'Головной офис, ул. Воровского, 172',
          iconContent: ''
      }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: 'img/assets/map-head.svg',
          iconImageSize: [36, 41],
          iconImageOffset: [-18, -20],
          iconContentOffset: [0, 0],
          iconContentLayout: MyIconContentLayout
      });
  
      smallMap.geoObjects
          .add(complexMark);
    
    smallMap.behaviors.disable('scrollZoom');
    smallMap.behaviors.enable('multiTouch');

    window.mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    if (mobileAndTabletCheck()) {
        smallMap.behaviors.disable('drag');
    }
}

if(smallMapBlock) {
    mapCenter = coordinatesMapData.krd
    ymaps.ready(smallMapInit)
}


// Модалки преимуществ

document.addEventListener('click', function() {
    if (event.target.dataset.open == 'benefit') {
        console.log('works')
        event.preventDefault();
        const benefitModal = $.modal({
            webp: benefitModalData.pictureWebpPath,
            image: benefitModalData.pictureCommonPath,
            title: benefitModalData.modalTitle,
            content: benefitModalData.modalContent,
            button: benefitModalData.buttonText
        })
        
        setTimeout(() => {
            benefitModal.open()
        }, 0)
    }
})