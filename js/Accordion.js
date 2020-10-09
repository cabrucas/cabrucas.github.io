class Accordion {

    constructor(selector) {
        this.selector = selector
    }

    createAccordion(selector) {
        const accordionList = document.querySelectorAll(this.selector);
        for (let element of accordionList) {
            element.addEventListener("click", function(){
                this.classList.toggle(this.classTrigger);
                let panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            })
        }
    }
}