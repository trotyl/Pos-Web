$(document).ready(function () {
    var boughtList = Order.all();
    var two_with_one_list = _(loadPromotions()).findWhere({type: 'BUY_TWO_GET_ONE_FREE'}).barcodes;
    _(two_with_one_list).each(function (barcode) {
        var item = boughtList[barcode];
        if(item && !item.promotion) {
            item.getPromotion();
        }
    }, this);
    var totalPrice = 0;
    var savePrice = 0;
    _(boughtList).each(function (item) {
        totalPrice += item.fare();
        savePrice += item.save();
        var extraSum = item.free > 0? ' (原价：' + item.total() + '元)': '';
        var boughtItem = $('<tr class="bought-item">\
                                <td>' + item.type + '</td>\
                                <td class="item-name">' + item.name + '</td>\
                                <td class="item-price">' + item.price + '</td>\
                                <td>' + item.unit + '</td>\
                                <td>\
                                    <div class="btn-group">\
                                        <button class="btn btn-default item-add">-</button>\
                                        <button class="btn btn-default item-count" disabled="disabled">' + item.count + '</button>\
                                        <button class="btn btn-default item-minus">+</button>\
                                    </div>\
                                </td>\
                                <td class="item-sum">' + item.fare() + '元' + extraSum + '</td>\
                            </tr>');
        $('#bought-table').append(boughtItem);

        if(item.free > 0) {
            var presentItem = $('<tr class="present-item">\
                                    <td>' + item.type + '</td>\
                                    <td class="item-name">' + item.name + '</td>\
                                    <td class="item-free">' + item.free + '</td>\
                                </tr>');
            $('#present-table').append(presentItem);
        }

        $('#total').text(totalPrice.toFixed(2) + '元');
        $('#save').text(savePrice.toFixed(2) + '元');
    }, this);

    $('#item-add').on('click', function () {
        var itemCount = $(this).closest('div').find('.item-count');
        itemCount.text(+itemCount.text() + 1);
        var itemName = $(this).closest('.bought-item').find('item-name').text();

        var item = _(JSON.parse(localStorage.boughtItems)).find({name: itemName});
        item.count++;
    });

});
