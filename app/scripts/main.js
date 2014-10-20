function boutghtItemHelper (item) {
    var itemLine = '<tr class="bought-item"><td class="item-type"></td><td class="item-name"></td><td class="item-price"></td><td class="item-unit"></td><td class="item-count"></td><td class="item-sum"></td></tr>';
    var itemDom = $(itemLine);
    itemDom.find('.item-type').text(item.type);
    itemDom.find('.item-name').text(item.name);
    itemDom.find('.item-price').text(item.price);
    itemDom.find('.item-unit').text(item.unit);
    itemDom.find('.item-count').text(item.count);
    itemDom.find('.item-sum').text(sumPriceHelper(item));
    return itemDom;
}

function buyButtonHelper () {
    return '<button class="btn btn-primary btm-sm">加入购物车</button>';
}

function cartCountInitiate () {
    var count = Order.getCartCount();
    $('#cart-count').text(count);
}

function cartItemHelper (item) {
    var itemLine = '<tr class="cart-item"><td class="item-type"></td><td class="item-name"></td><td class="item-price"></td><td class="item-unit"></td><td class="item-count"></td><td class="item-sum"></td></tr>';
    var itemDom = $(itemLine);
    itemDom.find('.item-type').text(item.type);
    itemDom.find('.item-name').text(item.name);
    itemDom.find('.item-price').text(item.price);
    itemDom.find('.item-unit').text(item.unit);
    itemDom.find('.item-count').html(countButtonGroupHelper(item.count));
    itemDom.find('.item-sum').text(sumPriceHelper(item));
    return itemDom;
}

function cartListener () {
    $('.item-count').on('click', 'button', function () {
        var itemName = $(this).closest('.cart-item').find('.item-name').text();
        var item = Order.findByName(itemName);
        if($(this).data('operation') == 'add') {
            item.addCount();
        }
        else {
            item.minusCount();
        }
        $(this).closest('.btn-group').find('.number').text(item.count);
        $(this).closest('.cart-item').find('.item-sum').text(sumPriceHelper(item));
        cartCountInitiate();
        if($('#cart-count').text() == 0) {
            loadView('list');
        }
    })
}

function cartController () {
    Order.getPromotion(loadPromotions());
    var cartItems = Order.all();
    _(cartItems).each(function (item) {
        var cartItem = cartItemHelper(item);
        $('#cart-table').append(cartItem);
    });
    $('#cart-fare').text(Order.fare().toFixed(2));
    $('#cart-saving').text(Order.saving().toFixed(2));
    cartListener();
}

function countButtonGroupHelper (count) {
    return '<div class="btn-group">\
                <button class="btn btn-default" data-operation="minus">-</button>\
                <button class="btn btn-default number" disabled="disabled">' + count + '</button>\
                <button class="btn btn-default" data-operation="add">+</button>\
            </div>'
}

function freeItemHelper (item) {
    var itemLine = '<tr class="free-item"><td class="item-type"></td><td class="item-name"></td><td class="item-free"></td></tr>';
    var itemDom = $(itemLine);
    itemDom.find('.item-type').text(item.type);
    itemDom.find('.item-name').text(item.name);
    itemDom.find('.item-free').text(item.free());
    return itemDom;
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

function homeController () {

}

function listItemHelper (item) {
    var itemLine = '<tr class="list-item"><td class="item-type"></td><td class="item-name"></td><td class="item-price"></td><td class="item-unit"></td><td class="item-buy"></td></tr>';
    var itemDom = $(itemLine);
    itemDom.find('.item-type').text(item.type);
    itemDom.find('.item-name').text(item.name);
    itemDom.find('.item-price').text(item.price);
    itemDom.find('.item-unit').text(item.unit);
    itemDom.find('.item-buy').html(buyButtonHelper());
    return itemDom;
}

function listListener () {
    $('.list-item').on('click', 'button', function () {
        var itemName = $(this).closest('.list-item').find('.item-name').text();
        var item = Order.findByName(itemName);
        item.addCount();
        cartCountInitiate();
    });
}

function listController () {
    var items = loadAllItems();
    _(items).each(function (item) {
        var listItem = listItemHelper(item);
        $('#item-table').append(listItem);
    });
    listListener();
}

function loadView (view) {
    $('#view').data('view', view).load(viewHelper(view), function () {
        mainController();
    });
}

function mainListener () {
    $('.view-option').on('click', function () {
        var view = $(this).data('view');
        loadView(view);
    });
}


function paymentListener () {
    $('#confirm').on('click', function () {
        Order.clear();
        loadView('home');
    })
}

function paymentController () {
    var cartItems = Order.all();
    _(cartItems).each(function (item) {
        var boughtItem = boutghtItemHelper(item);
        $('#list-table').append(boughtItem);
    });
    var freeItems = _(cartItems).filter(function (item) {
        return item.free() > 0;
    });
    _(freeItems).each(function (item) {
        var freeItem = freeItemHelper(item);
        $('#free-table').append(freeItem);
    });
    $('#dateTime').text(moment().format('YYYY年MM月DD日 HH:mm:ss'));
    $('#cart-fare').text(Order.fare().toFixed(2));
    $('#cart-saving').text(Order.saving().toFixed(2));
    paymentListener();
}

function mainController () {
    cartCountInitiate();
    mainListener();
    highlightInitiate();
    var view = $('#view').data('view');
    var doIt = {
        home: homeController,
        list: listController,
        cart: cartController,
        payment: paymentController
    };
    doIt[view]();
}

function sumPriceHelper (item) {
    var extra = item.free() > 0? ' (原价：' + item.total() + '元)': '';
    return item.fare() + '元' + extra;
}

function viewHelper (view) {
    return _.template('/views/<%= view %>.html', { view: view });
}

$(document).ready(function () {
    loadView('home');
    mainController();
});
