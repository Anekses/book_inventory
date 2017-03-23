var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.use(bodyParser.json());

// Connection URL
var url = 'mongodb://localhost:27017/booksdb';

var connectionPromise = MongoClient.connect(url, {
    db: {
        bufferMaxEntries: 0
    }
});
var collectionPromise = connectionPromise.then(function (db) {
    return db.collection('books');
})


// gety posty
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/stock', function (req, res, next) {
    collectionPromise.then(function (collection) {
        return collection.find({}).toArray();
    }).then(function (results) {
        res.send(results);
    }).catch(next);
});

app.post('/stock', function (req, res, next) {
    collectionPromise.then(function (collection) {
        return collection.insertOne(req.body)
    }).then(function () {
        res.json({
            isbn: req.body.isbn,
            count: req.body.count
        })
    });
});

app.put('/stock', function (req, res, next) {
    collectionPromise.then(function (collection) {
        return collection.updateOne({ isbn: req.body.isbn }, req.body)
    }).then(function () {
        res.json({
            isbn: req.body.isbn,
            count: req.body.count
        })
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