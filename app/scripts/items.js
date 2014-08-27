$(document).ready(function () {
    $('.list-item').on('click', 'button', function () {
        var count = $('#count');
        count.text(+count.text() + 1);

        var boughtItems = JSON.parse(localStorage.getItem('boughtItems')) || {};
        var itemName = $(this).closest('.list-item').find('.item-name').text();
        boughtItems[itemName] || (boughtItems[itemName] = 0);
        boughtItems[itemName] += 1;
        localStorage.boughtItems = JSON.stringify(boughtItems);
    });
});