function Item(barcode, name, unit, price, type, count, promotion) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.type = type;
    this.count = count || 0;
    this.promotion = promotion || false;
}

Item.prototype.storage = function () {
    var boughtItems = JSON.parse(localStorage.boughtItems);
    boughtItems[this.barcode] = this;
    localStorage.boughtItems = JSON.stringify(boughtItems);
};

Item.prototype.getPromotion = function () {
    this.promotion = true;
    this.storage();
};

Item.prototype.addCount = function() {
    this.count++;
    this.storage();
};

Item.prototype.minusCount = function () {
    if(this.count <= 0) {
        return;
    }
    this.count--;
    this.storage();
};

Item.prototype.sumDisplay = function () {
    var extraSum = this.free() > 0? ' (原价：' + this.total() + '元)': '';
    return this.fare() + '元' + extraSum;
};

Item.prototype.free = function () {
    return this.promotion? Math.floor(this.count / 3): 0;
};

Item.prototype.total = function () {
    return this.count * this.price;
};

Item.prototype.fare = function () {
    return (this.count - this.free()) * this.price;
};

Item.prototype.save = function () {
    return this.free() * this.price;
};
