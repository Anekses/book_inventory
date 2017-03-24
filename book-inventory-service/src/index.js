module.exports = function (stockRepository) {
    var express = require('express')
    var bodyParser = require('body-parser')
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var app = express()
    var routes = require('./routes')(stockRepository);
    var error = require('./error')()

    app.use(bodyParser.json());

    // gety posty
    app.get('/', routes.getHero);
    app.get('/stock', routes.getStock);
    app.get('/stock/:isbn', routes.getByISBN);
    app.post('/stock', routes.addStock);
    app.put('/stock', routes.updateStock);
    // event handler
    app.use(error.clientError);
    app.use(error.serverError);

    return app;
};