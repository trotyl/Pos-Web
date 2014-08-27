$(document).ready(function () {
    var total = 0;
    var save = 0;

    $('.bought-item').each(function () {
        var itemName = $(this).find('.item-name').text();
        var boughtItems = JSON.parse(localStorage.boughtItems);
        var itemCount = boughtItems[itemName] || 0;
        var itemPrice = +$(this).find('.item-price').text();
        $(this).find('.item-count').text(itemCount);
        $(this).find('.item-sum').text(itemCount * itemPrice);
    });
});
