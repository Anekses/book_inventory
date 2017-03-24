module.exports = function() {
    var items = [];

    return {
        _items: function(state) {
            items = state;
        },
        addStock: function (isbn, count) {
            items.push({"isbn": isbn, "count": count});
            return Promise.resolve();
        },
        findAll: function () {
            return Promise.resolve(items);
        },
        getStockByISBN: function (isbn) {
            var foundItemCount = null;
            items.forEach(function(item) {
                if(item.isbn === isbn) {
                    foundItemCount = item.count;
                }
            });
            return Promise.resolve(foundItemCount);
        }
    };
};