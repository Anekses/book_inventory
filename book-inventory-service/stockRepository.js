var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// app.use(bodyParser.json());
var url = 'mongodb://localhost:27017/booksdb';

var connectionPromise = MongoClient.connect(url, {
    db: {
        bufferMaxEntries: 0
    }
});
var collectionPromise = connectionPromise.then(function (db) {
    return db.collection('books');
});

// Functions
addStock = function (isbn, count) {
    return collectionPromise.then(function (collection) {
        return collection.insertOne({isbn: isbn, count: count})
    });
}

updateStock = function (selector, body) {
    return collectionPromise.then(function (collection) {
        return collection.updateOne(selector, body)
    });
}

findAll = function () {
    return collectionPromise.then(function (collection) {
        return collection.find({}).toArray();
    });
}


module.exports = {addStock, updateStock, findAll};