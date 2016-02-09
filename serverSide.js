var http = require('http');
var fs = require('fs');

// 404 message
function send404Response(response) {
  response.writeHead(404, {"content-type" : "text/plain"});
  response.write("Error: 404 - asset no found");
  response.end(); // tells the function we are done writing
}

// handle user request
function onRequest(request, response) {
  // confirm client is using GET and request is for homepage
  if(request.method == 'GET' && request.url == "/") {
    response.writeHead(200, {"content-type" : "text/html"});
    fs.createReadStream('./index.html').pipe(response);
  } else if(request.method == 'GET' && request.url == "/breakfast.txt") {
    fs.createReadStream('./breakfast.txt').pipe(response);
  } else {
    send404Response(response);
  }
}

http.createServer(onRequest).listen(8080);
console.log('server is online');
