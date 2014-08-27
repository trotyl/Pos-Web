$(document).ready(function () {
    var boughtList = JSON.parse(localStorage.boughtItems);
    var two_with_one_list = _(loadPromotions()).findWhere({type: 'BUY_TWO_GET_ONE_FREE'}).barcodes;
    _(two_with_one_list).each(function (barcode) {
        var item = boughtList[barcode];
        if(item && !item.promotion) {
            item.promotion = true;
            item.free = Math.floor(item.count / 3);
            item.fare = (item.count - item.free) * item.price;
        }
    }, this);
    var totalPrice = 0;
    var savePrice = 0;
    _(boughtList).each(function (item) {
        item.fare || (item.fare = (item.count - item.free) * item.price);
        totalPrice += item.fare;
        savePrice += item.free * item.price;
        var boughtItem = $('<tr class="bought-item">\
                                <td>' + item.type + '</td>\
                                <td class="item-name">' + item.name + '</td>\
                                <td class="item-price">' + item.price + '</td>\
                                <td>' + item.unit + '</td>\
                                <td>\
                                    <div class="btn-group">\
                                        <button class="btn btn-default">-</button>\
                                        <button class="btn btn-default item-counter" disabled="disabled">' + item.count + '</button>\
                                        <button class="btn btn-default">+</button>\
                                    </div>\
                                </td>\
                                <td class="item-summary">' + item.fare + '</td>\
                            </tr>');
        $('#bought-table').append(boughtItem);


    }, this);


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
