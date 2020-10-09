class TabMaker {
    constructor(options) {
        this.tabGroupParentSelector = options.tabGroupParentSelector;
        this.tabBtnSelector = options.tabBtnSelector;
        this.tabContentSelector = options.tabContentSelector;
        this.activationClass = options.activationClass;
        this.defaultTabToShow = options.defaultTabToShow;
    }

    createTabs() {
        const tabGroupContainer = document.querySelector(this.tabGroupParentSelector) || false;

        if (tabGroupContainer) {
            const defaultTab = this.defaultTabToShow;
            const tabBtnList = tabGroupContainer.querySelectorAll(this.tabBtnSelector) || [];
            const tabContentList = tabGroupContainer.querySelectorAll(this.tabContentSelector) || [];
            const classTrigger = this.activationClass;

            if (tabBtnList.length === 0) {
                console.warn('Ошибка в названиях селектора табов: селектора ' + this.tabBtnSelector + ' не существует.');
            }
            if (tabContentList.length === 0) {
                console.warn('Ошибка в названиях селектора блока контента: селектора ' + this.tabContentSelector + ' не существует.');
            }
            tabBtnList.forEach(OnTabClick);

            function OnTabClick(item) {
                item.addEventListener('click', function(){
                    let currentBtn = item;
                    let tabID = currentBtn.getAttribute('data-tab');
                    let currentTab = tabGroupContainer.querySelector(tabID);

                    if (!currentBtn.classList.contains('active')) {
                        tabBtnList.forEach(function(item) {
                            item.classList.remove(classTrigger);
                        });
                        tabContentList.forEach(function(item) {
                            item.classList.remove(classTrigger);
                        });
        
                        currentBtn.classList.add(classTrigger);
                        currentTab.classList.add(classTrigger);
                    }
                });
            }

            tabGroupContainer.querySelector(defaultTab).click();
        } else {
            console.warn('Создать табы невозможно: ошибка DOM структуры.');
        }
    }
}