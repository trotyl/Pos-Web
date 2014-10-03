$(document).ready(function () {
    var boughtList = Order.all();
    Order.getPromotion(boughtList, loadPromotions());

    _(boughtList).each(function (item) {
        var boughtItem = $('<tr class="bought-item">\
                                <td>' + item.type + '</td>\
                                <td class="item-name">' + item.name + '</td>\
                                <td class="item-price">' + item.price + '</td>\
                                <td>' + item.unit + '</td>\
                                <td>\
                                    <div class="btn-group">\
                                        <button class="btn btn-default item-minus">-</button>\
                                        <button class="btn btn-default item-count" disabled="disabled">' + item.count + '</button>\
                                        <button class="btn btn-default item-add">+</button>\
                                    </div>\
                                </td>\
                                <td class="item-sum">' + item.sumDisplay() + '</td>\
                            </tr>');
        $('#bought-table').append(boughtItem);
    }, this);

    $('.item-add').on('click', function () {
        var itemName = $(this).closest('.bought-item').find('.item-name').text();
        var item = Order.findByName(itemName);
        item.addCount();
        var itemCount = $(this).closest('div').find('.item-count');
        itemCount.text(item.count);
        var itemSum = $(this).closest('.bought-item').find('.item-sum');
        itemSum.text(item.sumDisplay());
    });

    $('.item-minus').on('click', function () {
        var itemName = $(this).closest('.bought-item').find('.item-name').text();
        var item = Order.findByName(itemName);
        item.minusCount();
        var itemCount = $(this).closest('div').find('.item-count');
        itemCount.text(item.count);
        var itemSum = $(this).closest('.bought-item').find('.item-sum');
        itemSum.text(item.sumDisplay());
    });

});
