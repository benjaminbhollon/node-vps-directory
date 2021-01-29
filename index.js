const bouncy = require('bouncy');

//Import directory
const directory = require('./directory.json');

var server = bouncy(function (req, res, bounce) {
  if (directory[req.headers.host] !== undefined) {
    bounce(directory[req.headers.host]);
  } else {
    res.statusCode = 404;
    res.end('no such host');
  }
  console.log(req.headers.host);
});
server.listen(80);
