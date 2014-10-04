function buyButtonFormer () {
    return '<button class="btn btn-primary btm-sm">加入购物车</button>';
}

function cartAddItem (itemName) {
    var item = Order.findByName(itemName);
    item.addCount();
}

function cartCountInitiate () {
    $('#cart-count').text(Order.getCartCount());
}

function cartItemFormer (item) {
    var itemLine = '<tr class="cart-item"><td class="item-type"></td><td class="item-name"></td><td class="item-price"></td><td class="item-unit"></td><td class="item-count"></td><td class="item-sum"></td></tr>';
    var itemDom = $(itemLine);
    itemDom.find('.item-type').text(item.type);
    itemDom.find('.item-name').text(item.name);
    itemDom.find('.item-price').text(item.price);
    itemDom.find('.item-unit').text(item.unit);
    itemDom.find('.item-count').html(countButtonGroupFormer(item.count));
    itemDom.find('.item-sum').text(sumPriceFormer(item));
    return itemDom;
}

function cartViewInitiate () {
    var cartItems = Order.all();
    _(cartItems).each(function (item) {
        var cartItem = cartItemFormer(item);
        $('#cart-table').append(cartItem);
    })
}

function countButtonGroupFormer (count) {
    return '<div class="btn-group">\
                <button class="btn btn-default" data-operation="minus">-</button>\
                <button class="btn btn-default" disabled="disabled">' + count + '</button>\
                <button class="btn btn-default" data-operation="add">+</button>\
            </div>'
}

function highlightInitiate () {
    var currentView = $('#view').data('view');
    $('.highlight-option').each(function () {
        $(this).removeClass('active');
        if($(this).data('view') == currentView) {
            $(this).addClass('active');
        }
    })
}

function listenerInitiate () {
    $('.view-option').on('click', function () {
        var view = $(this).data('view');
        loadView(view);
    });
}

function listItemFormer (item) {
    var itemLine = '<tr class="list-item"><td class="item-type"></td><td class="item-name"></td><td class="item-price"></td><td class="item-unit"></td><td class="item-buy"></td></tr>';
    var itemDom = $(itemLine);
    itemDom.find('.item-type').text(item.type);
    itemDom.find('.item-name').text(item.name);
    itemDom.find('.item-price').text(item.price);
    itemDom.find('.item-unit').text(item.unit);
    itemDom.find('.item-buy').html(buyButtonFormer());
    return itemDom;
}

function listListenerInitiate () {
    $('.list-item').on('click', 'button', function () {
        cartAddItem($(this).closest('.list-item').find('.item-name').text());
        cartCountInitiate();
    });
}

function listViewInitiate () {
    var items = loadAllItems();
    _(items).each(function (item) {
        var listItem = listItemFormer(item);
        $('#item-table').append(listItem);
    });
    listListenerInitiate();
}

function loadView (view) {
    $('#view').data('view', view);
    $.get(viewPath(view), function (data) {
        $('#view').html(data);
        refresh();
    });
}

function refresh () {
    cartCountInitiate();
    listenerInitiate();
    highlightInitiate();
    var view = $('#view').data('view');
    if(view == 'list') {
        listViewInitiate();
    }
    else if(view == 'cart') {
        cartViewInitiate();
    }
}

function sumPriceFormer (item) {
    var free = item.promotion? Math.floor(item.count / 3): 0;
    var fare = (item.count - free) * item.price;
    var extra = free > 0? ' (原价：' + fare + '元)': '';
    return fare + '元' + extra;
}

function viewPath (view) {
    return 'views/' + view + '.html';
}

$(document).ready(function () {
    loadView('home');
    refresh();
});
