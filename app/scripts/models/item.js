function Item(name, unit, price, type, count, promotion) {
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.type = type;
    this.count = count || 0;
    this.promotion = promotion || false;
}

Item.prototype.save = function () {
    Order.save(this);
};

Item.prototype.getPromotion = function () {
    this.promotion = true;
    this.save();
};

Item.prototype.addCount = function() {
    this.count++;
    this.save();
    return this.count;
};

Item.prototype.minusCount = function () {
    if(this.count <= 0) {
        return false;
    }
    this.count--;
    this.save();
    return this.count;
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

Item.prototype.saving = function () {
    return this.free() * this.price;
};
