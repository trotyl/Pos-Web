function Order () {

}

Order.all = function () {
    var boughtItems = JSON.parse(localStorage.boughtItems);
    return _(boughtItems).map(function (item) {
        return new Item(item.barcode, item.name, item.unit, item.type, item.price, item.count, item.promotion, item.free);
    });
};


