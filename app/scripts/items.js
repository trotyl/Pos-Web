$(document).ready(function () {
    var items = loadAllItems();
    _(items).each(function (item) {
        var itemType = item.type;
        var itemName = item.name;
        var itemPrice = item.price;
        var itemUnit = item.unit;
        var buyButton = '<button class="btn btn-primary btm-sm">加入购物车</button>';
        var listItem = $('<tr class="list-item">\
                            <td>' + itemType + '</td>\
                            <td class="item-name">' + itemName + '</td>\
                            <td>' + itemPrice + '</td>\
                            <td>'+ itemUnit +'</td>\
                            <td>' + buyButton + '</td>\
                          </tr>')
        $('#item-table').append(listItem);
    });
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