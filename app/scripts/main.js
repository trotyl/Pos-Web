function viewPath (view) {
    return 'views/' + view + '.html';
}

function loadView (view) {
    $('#view').data('view', view);
    $.get(viewPath(view), function (data) {
        $('#view').html(data);
        listenerInitiate();
        highlightInitiate();
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

function highlightInitiate () {
    var currentView = $('#view').data('view');
    $('.highlight-option').each(function () {
        $(this).removeClass('active');
        if($(this).data('view') == currentView) {
            $(this).addClass('active');
        }
    })
}

$(document).ready(function () {
    loadCartCount();
    loadView('home');
    listenerInitiate();
    highlightInitiate();
});
