const bouncy = require('bouncy');

//Import directory
const directory = require('./directory.json');

var server = bouncy(function (req, res, bounce) {
  if (directory[req.headers.host] !== undefined) {
    bounce(directory[req.headers.host]);
  } else if (directory[req.headers.host.slice(4)] !== undefined) {
    res.writeHead(301, {
      Location: '//' + req.headers.host.replace('www.', '') + req.url
    });
    console.log(req.url);
  } else {
    res.statusCode = 404;
    console.log(req.headers.host);
    res.end('no such host');
  }
});
server.listen(80);
