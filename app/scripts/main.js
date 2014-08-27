function cartCount () {
    var boughtItems = JSON.parse(localStorage.boughtItems);
    var total = 0;
    for(var item in boughtItems) {
        total += boughtItems[item] || 0;
    }
    return total;
}

$(document).ready(function () {
    localStorage.getItem('boughtItems') || (localStorage.boughtItems = JSON.stringify({}));
    $('#count').text(cartCount());
});
