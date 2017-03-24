module.exports = function() {
    var items = [];

    return {
        _items: function(state) {
            items = state;
        },
        addStock: function (isbn, count) {
            var item = {
                "isbn": isbn,
                "count": count
            }
            // return Promise.resolve();
            // var updated = false;
            // items.forEach(function(item) {
                // if(item.isbn === isbn) {
                //     item.count = count;
                //     updated = true;
                // }
            // });
            // if(!updated) {
            items.push(item);
            // }
            return Promise.resolve(item);
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