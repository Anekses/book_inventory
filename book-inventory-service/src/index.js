var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var stockRepository = require('./stockRepository');

app.use(bodyParser.json());

// // Connection URL
// var url = 'mongodb://localhost:27017/booksdb';

// var connectionPromise = MongoClient.connect(url, {
//     db: {
//         bufferMaxEntries: 0
//     }
// });
// var collectionPromise = connectionPromise.then(function (db) {
//     return db.collection('books');
// })


// gety posty
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/stock', function (req, res, next) {
    stockRepository
        .findAll()
        .then(function (result) {
            res.send(result);
        }).catch(next);
});

app.get('/stock/:isbn', function(req, res, next) {
    stockRepository
        .getStockByISBN(req.params['isbn'])
        .then(function(result) {
            res.send(result);
        }).catch(next);
});

app.post('/stock', function (req, res, next) {
    stockRepository
        .addStock(req.body.isbn, req.body.count)
        .then(function (result) {
            res.json({
                isbn: req.body.isbn,
                count: req.body.count
            })
        }).catch(next);
});

app.put('/stock', function (req, res, next) {
    var selector = { isbn: req.body.isbn };
    
    stockRepository
        .updateStock(selector, req.body)
        .then(function (result) {
            res.json({
                isbn: req.body.isbn,
                count: req.body.count
            });
        });
});

app.get('/error', function (req, res) {
    throw new Error('forced error');
});

// event handler
app.use(clientError);
app.use(serverError);

function clientError(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
}

function serverError(error, req, res, next) {
    var status = error.status || 500;
    res.status(status);
    console.error(error.stack);
    res.send('Oh no: ' + status);
}

module.exports = app;