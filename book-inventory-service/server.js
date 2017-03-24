var stockRepository = require('./src/stockRepository');
var app = require('./src/index')(stockRepository);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});