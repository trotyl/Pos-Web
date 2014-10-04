function viewPath (view) {
    return 'views/' + view + '.html';
}

function loadView (view) {
    $.get(viewPath(view), function (data) {
        $('#view').html(data);
        listenerInitiate();
    });
}

function loadCartCount () {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return _(cartItems).reduce(function (sum, item) {
        return sum + item.count();
    }, 0)
}

function listenerInitiate () {
    $('.view-option').on('click', function () {
        var view = $(this).data('view');
        loadView(view);
    })
}

$(document).ready(function () {
    loadCartCount();
    loadView('home');
    listenerInitiate();
});
