var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json());

// gety posty
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/stock', function (req, res, next) {
    res.json({
        isbn: req.body.isbn,
        count: req.body.count
    });
});

app.get('/error', function(req, res) {
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