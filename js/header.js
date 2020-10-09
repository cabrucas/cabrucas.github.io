
let options = {
    tabGroupParentSelector: '.js-tab-parent', // Селектор родительского контейнера.
    tabBtnSelector: '.js-tab', // Селектор вкладки (таба).
    tabContentSelector: '.js-tab-item', // Селектор контентного блока.
    activationClass: 'active', // CSS класс, активирующий видимость таба и соответствующей ему контентной области.
    defaultTabToShow: '.js-tab:nth-child(1)' // Псевдокласс или иной селектор, который однозначно укажет на вкладку, которая должна быть активна по умолчанию.
};

const tab = new TabMaker(options);
tab.createTabs();