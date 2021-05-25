const bouncy = require('bouncy');

//Import directory
const directory = require('./directory.json');

function createHandler(protocol) {
  return (req, res, bounce) => {
    if (directory[req.headers.host] !== undefined) {
      if (protocol === 'http' && String(directory[req.headers.host])[0] === '4')
        return res.writeHead(301, {
          Location: 'https://' + req.headers.host + req.url
        });
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
  }
}

const http = bouncy(createHandler('http'));
http.listen(80);

const https = bouncy(createHandler('https'));
https.listen(443);
