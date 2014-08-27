function Item(barcode, name, unit, type, price, count, promotion, free) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.type = type;
    this.price = price || 0.00;
    this.count = count || 0;
    this.promotion = promotion || false;
    this.free = free || 0;
}

Item.prototype.getPromotion = function() {
	this.promotion = true;
	this.free = Math.floor(this.count / 3);
};

Item.prototype.addCount = function() {
	this.count++;
	this.promotion && this.getPromotion();
};

Item.prototype.minusCount = function () {
    if(this.count <= 0) {
        return;
    }
    this.count--;
    this.promotion && this.getPromotion();
};

Item.prototype.total = function () {
    return this.count * this.price;
};

Item.prototype.fare = function () {
    return (this.count - this.free) * this.price;
};

Item.prototype.save = function () {
    return this.free * this.price;
};
