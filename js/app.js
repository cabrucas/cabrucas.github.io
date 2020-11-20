const handlersList = document.querySelectorAll('[data-opener]') || false;
if (handlersList) {
    const itemsList = document.querySelectorAll('[data-info]');
    for (let handler of handlersList) {
        for (let item of itemsList) {            
            handler.addEventListener('mouseenter', function(){
                if (handler.dataset.opener !== item.dataset.info) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    }
}

let myscroll;

(function () {
    myScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.1,
        multiplier: 2
    });
    
})();

function Init() {
    myScroll.update();
    console.log('da');
}

Init();

window.addEventListener('resize', function(){
    myScroll.update();
    myScroll.start();
});