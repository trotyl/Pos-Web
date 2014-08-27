function cartCount () {
    var boughtItems = JSON.parse(localStorage.getItem('boughtItems')) || {};
    var total = 0;
    for(var item in boughtItems) {
        total += boughtItems[item] || 0;
    }
    return total;
}

$(document).ready(function () {
    $('#count').text(cartCount());
});
