module.exports = function(stockRepository) {
    this.getHero = function (req, res) {
        res.send('Hello World Adrianie!!'); 
    }

    this.getStock = function (req, res, next) {
        stockRepository
            .findAll()
            .then(function (result) {
                res.send(result);
            }).catch(next);
    }

    this.getByISBN = function (req, res, next) {
        stockRepository
            .getStockByISBN(req.params['isbn'])
            .then(function (result) {
                res.send(result);
            }).catch(next);
    }

    this.addStock = function (req, res, next) {
        stockRepository
            .addStock(req.body.isbn, req.body.count)
            .then(function (result) {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                })
            }).catch(next);
    }

    this.updateStock = function (req, res, next) {
        var selector = { isbn: req.body.isbn };

        stockRepository
            .updateStock(selector, req.body)
            .then(function (result) {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                });
            });
    }

    return this;
}