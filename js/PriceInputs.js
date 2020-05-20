var regions = new Choices(document.getElementById('region-select'), {
    renderChoiceLimit: 5,
    noResultsText: 'Ничего не найдено',
    noChoicesText: 'Ничего нет',
    itemSelectText: '',
    shouldSort: true,
    shouldSortItems: true,
});

var cities = new Choices(document.getElementById('city-select'), {
    renderChoiceLimit: 5,
    noResultsText: 'Ничего не найдено',
    noChoicesText: 'Ничего нет',
    itemSelectText: '',
    shouldSort: true,
    shouldSortItems: true,
});