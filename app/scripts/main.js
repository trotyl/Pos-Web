function viewPath (view) {
    return 'views/' + view + '.html';
}

function loadView (view) {
    $.get(viewPath(view), function (data) {
        $('#view').html(data);
    });
}

function loadCartCount () {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return _(cartItems).reduce(function (sum, item) {
        return sum + item.count();
    }, 0)
}

$(document).ready(function () {
    loadCartCount();
    loadView('home');
});
