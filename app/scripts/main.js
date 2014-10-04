function buyButtonFormer () {
    return '<button class="btn btn-primary btm-sm">加入购物车</button>';
}

function cartAddItem (itemName) {
    console.log(itemName);
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    cartItems[itemName] || (cartItems[itemName] = _(loadAllItems()).find({name: itemName}));
    cartItems[itemName].count += 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function cartCountInitiate () {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    $('#cart-count').text(_(cartItems).reduce(function (sum, item) {
        return sum + item.count;
    }, 0));
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
    var itemLine = '<tr class="list-item" data-item=""><td class="item-type"></td><td class="item-name"></td><td class="item-price"></td><td class="item-unit"></td><td class="item-buy"></td></tr>';
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

function loadAllItems() {
    return [
        new Item('ITEM000000', '可口可乐', '瓶', 3.00, '饮料'),
        new Item('ITEM000001', '雪碧', '瓶', 3.00, '饮料'),
        new Item('ITEM000002', '苹果', '斤', 5.50, '水果'),
        new Item('ITEM000003', '荔枝', '斤', 15.00, '水果'),
        new Item('ITEM000004', '电池', '个', 2.00, '生活用品'),
        new Item('ITEM000005', '方便面', '袋', 4.50, '食品')
    ];
}

function loadPromotions() {
    return [
        new Promotion('BUY_TWO_GET_ONE_FREE', [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
        ])
    ]
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
    if($('#view').data('view') == 'list') {
        listViewInitiate();
    }

}

function viewPath (view) {
    return 'views/' + view + '.html';
}

$(document).ready(function () {
    loadView('home');
    refresh();
});
