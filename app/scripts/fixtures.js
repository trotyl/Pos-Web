function loadAllItems() {
    return [
        new Item('可口可乐', '瓶', 3.00, '饮料'),
        new Item('雪碧', '瓶', 3.00, '饮料'),
        new Item('苹果', '斤', 5.50, '水果'),
        new Item('荔枝', '斤', 15.00, '水果'),
        new Item('电池', '个', 2.00, '生活用品'),
        new Item('方便面', '袋', 4.50, '食品')
    ];
}

function loadPromotions() {
    return [
        new Promotion('BUY_TWO_GET_ONE_FREE', [
            '可口可乐',
            '雪碧',
            '方便面'
        ])
    ]
}
