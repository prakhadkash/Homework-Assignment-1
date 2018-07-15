// Dependencies Modules
const http = require('http');
const url = require('url');


// Creates Server
var server = http.createServer((req, res) => {

  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl
    .pathname
    .replace(/^\/+|\/+$/g, '');

  req.on('data', (data) => {});
  req.on('end', () => {

    var chosenHandler = router[path] || handlers.notFound;

    chosenHandler({}, (statusCode = 200, payload = {}) => {
      var payloadString = JSON.stringify(payload);

      res.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });

      res.end(payloadString);
    });
  });
});

// listens on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Router Handlers
var handlers = {};
handlers.hello = function (data, cb) {
  cb(200, {
    'welcomeMessage': 'Warm welcome! Thanks for trying out my hello API App. This is the reply to your Request on \'/hello\' path from the API.'
  });
};

handlers.notFound = function (data, cb) {
  cb(404);
}

// Available Routers
var router = {
  'hello': handlers.hello
}