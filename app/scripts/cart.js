$(document).ready(function () {
    var total = 0;
    var save = 0;
    var two_with_one_list = _(loadPromotions()).findWhere({type: 'BUY_TWO_GET_ONE_FREE'}).barcodes;

    $('.bought-item').each(function () {
        var itemName = $(this).find('.item-name').text();
        var boughtItems = JSON.parse(localStorage.boughtItems);
        var itemCount = boughtItems[itemName] || 0;
        if(_(two_with_one_list).some(function (name) { return name == itemName; })) {
            var itemFree = Math.floor(this.count / 3);
        }

        var itemPrice = +$(this).find('.item-price').text() - itemFree;
        $(this).find('.item-count').text(itemCount);
        $(this).find('.item-sum').text(itemCount * itemPrice);
    });
});
