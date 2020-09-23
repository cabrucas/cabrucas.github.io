const $ = {}
window.$ = $

function CreateModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('d-modal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="d-modal__window">
            <picture>
                <source srcset="${options.webp || ''}" type="image/webp">
                <img src="${options.image || ''}" alt="ЖК" class="d-modal__picture">
            </picture>
            <div class="container">
                <div class="content-wrapper content-wrapper--content-page">
                    <div class="content-block content-block--half">
                        <div class="store-wrapper-block">
                            <h1>${options.title || ''}</h1>
                        </div>
                    </div>
                    <div class="content-block content-block--half">
                        <div class="store store--offset-top">
                            <p class="plain store__text">${options.content || ''}</p>
                            <a href="#" class="informer-block informer-block--offset-bottom">
                                <p class="informer-block__text">${options.button || ''}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <button class="d-modal__close" data-close="true"></button>
        </div>
    `)
    document.body.appendChild(modal)
    
    return modal
}

$.modal = function(options) {
    const $modal = CreateModal(options)
    const modal = {
        open() {
            document.body.classList.add('noscroll')
            document.querySelector('.header').classList.add('noscroll')
            !isClosing && $modal.classList.add('open')
            setTimeout(()=>{
                document.querySelector('.d-modal__picture').classList.add('full')
            }, animationSpeed)      
            setTimeout(()=>{
                document.querySelector('.d-modal__close').classList.add('full')
            }, animationSpeed)      
        },
        close() {
            isClosing = true
            document.querySelector('.d-modal__picture').classList.remove('full')
            document.querySelector('.d-modal__close').classList.remove('full')
            $modal.classList.remove('open')
            setTimeout(() => {
                document.body.classList.remove('noscroll')
                document.querySelector('.header').classList.remove('noscroll')
                isClosing = false
                return isClosing
            }, animationSpeed)
            setTimeout(() => {
                $modal.parentNode.removeChild($modal)
                $modal.removeEventListener('click', listener)
            }, animationSpeed)
                      
        }
    }

    const animationSpeed = 1000
    let isClosing = false
    const listener = event => {
        if(event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)
    
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
        }
    })
}