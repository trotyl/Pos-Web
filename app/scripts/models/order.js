function Order () {

}

Order.all = function () {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    var result = {};
    _(cartItems).each(function (item) {
        result[item.name] = new Item(item.name, item.unit, item.price, item.type, item.count, item.promotion);
    });
    return result;
};

Order.save = function (item) {
    var boughtItems = Order.all();
    boughtItems[item.name] = item;
    localStorage.setItem('cartItems', JSON.stringify(boughtItems));
};

Order.findByName = function (name) {
    return _(Order.all()).find(function (item) {
        return item.name == name;
    });
};

Order.getCartCount = function () {
    var cartItems = Order.all();
    return _(cartItems).reduce(function (sum, item) {
        return sum + item.count;
    }, 0);
};

Order.getPromotion = function (promotions) {
    var items = Order.all();
    var two_with_one_list = _(promotions).findWhere({type: 'BUY_TWO_GET_ONE_FREE'}).names;
    _(two_with_one_list).each(function (name) {
        var item = items[name];
        if(item && !item.promotion) {
            item.getPromotion();
        }
    }, this);
};

Order.totalPrice = function (items) {
    return _(items).reduce(function (sum, item) {
        return sum + item.total();
    }, 0);
};

Order.savePrice = function (items) {
    return _(items).reduce(function (sum, item) {
        return sum + item.save();
    }, 0);
};
