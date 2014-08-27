$(document).ready(function () {
    var items = loadAllItems();
    _(items).each(function (item) {
        var buyButton = '<button class="btn btn-primary btm-sm">加入购物车</button>';
        var listItem = $('<tr class="list-item" data-barcode="' + item.barcode + '">\
                            <td>' + item.type + '</td>\
                            <td class="item-name">' + item.name + '</td>\
                            <td>' + item.price + '</td>\
                            <td>'+ item.unit +'</td>\
                            <td>' + buyButton + '</td>\
                          </tr>');
        $('#item-table').append(listItem);
    });
    $('.list-item').on('click', 'button', function () {
        var count = $('#count');
        count.text(+count.text() + 1);

        var boughtItems = JSON.parse(localStorage.getItem('boughtItems'));
        var itemBarcode = $(this).closest('.list-item').data('barcode');
        var itemName = $(this).closest('.list-item').find('.item-name').text();
        boughtItems[itemBarcode] || (boughtItems[itemBarcode] = _(items).find({name: itemName}));
        boughtItems[itemBarcode].count += 1;
        localStorage.boughtItems = JSON.stringify(boughtItems);
    });
});