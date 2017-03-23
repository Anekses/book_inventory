var express = require('express')
var app = express()

function logRequest(req, res, next) {
    console.log('incoming request at ', new Date());
    next();
}

function auth(req, res, next) {
    console.log('you can pass my auth');
    next();
}

// app.use(logRequest);
// app.use(auth);

app.get('/', [logRequest, auth], function(req, res) {
    res.send('Hello world');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})