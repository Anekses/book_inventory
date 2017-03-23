var http = require('http');
var server = http.createServer(function (req, res) {
  res.end('hello world');
});
server.listen(3000, function () {
  console.log("When this callback is invoked our server is listening on port: " + 3000);
});