const acc = new Accordion('.js-accordion');
acc.createAccordion();
let defaultElementOpened = document.querySelector('#accordion-default');
defaultElementOpened.classList.add('accordion-active');
defaultElementOpened.click();

const accordionLabelsList = document.getElementsByClassName('js-accordion');
for (let element of accordionLabelsList) {
    element.addEventListener('click', function(){
        element.classList.toggle('accordion-active');
    })
}