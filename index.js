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
    res.end();
  } else {
    res.statusCode = 404;
    res.end('no such host');
    console.log(req.headers.host);
  }
});
server.listen(80);
