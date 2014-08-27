function refresh () {
    var boughtList = Order.all();
    $('.present-item').remove();
    _(boughtList).each(function (item) {
        if(item.free() > 0) {
            var presentItem = $('<tr class="present-item">\
                                    <td>' + item.type + '</td>\
                                    <td class="item-name">' + item.name + '</td>\
                                    <td class="item-free">' + item.free() + '</td>\
                                </tr>');
            $('#present-table').append(presentItem);
        }
    });
    $('#total').text(Order.totalPrice(boughtList).toFixed(2) + '元');
    $('#save').text(Order.savePrice(boughtList).toFixed(2) + '元');
    $('#count').text(cartCount());
}

$(document).ready(function () {
    var boughtList = Order.all();
    Order.getPromotion(boughtList, loadPromotions());

    _(boughtList).each(function (item) {
        var boughtItem = $('<tr class="bought-item">\
                                <td>' + item.type + '</td>\
                                <td class="item-name">' + item.name + '</td>\
                                <td class="item-price">' + item.price + '</td>\
                                <td>' + item.unit + '</td>\
                                <td>' + item.count + '</td>\
                                <td class="item-sum">' + item.sumDisplay() + '</td>\
                            </tr>');
        $('#bought-table').append(boughtItem);
    }, this);

    refresh();

    $('.item-add').on('click', function () {
        var itemName = $(this).closest('.bought-item').find('.item-name').text();
        var item = Order.findByName(itemName);
        item.addCount();
        var itemCount = $(this).closest('div').find('.item-count');
        itemCount.text(item.count);
        var itemSum = $(this).closest('.bought-item').find('.item-sum');
        itemSum.text(item.sumDisplay());
        refresh();
    });

    $('.item-minus').on('click', function () {
        var itemName = $(this).closest('.bought-item').find('.item-name').text();
        var item = Order.findByName(itemName);
        item.minusCount();
        var itemCount = $(this).closest('div').find('.item-count');
        itemCount.text(item.count);
        var itemSum = $(this).closest('.bought-item').find('.item-sum');
        itemSum.text(item.sumDisplay());
        refresh();
    });

    $('#dateTime').text(moment().format('YYYY年MM月DD日 HH:mm:ss'));
});
