const bouncy = require('bouncy');
const config = require('./config.json');
const fs = require('fs');
const ssl = (config.ssl ? {
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert)
} : false);

//Import directory
const directory = require('./directory.json');

function createHandler(protocol) {
  return (req, res, bounce) => {
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
      console.log('could not find host ' + req.headers.host);
    }
  }
}

const http = bouncy(createHandler('http'));
http.listen(80);

if (ssl) {
  const https = bouncy(ssl, createHandler('https'));
  https.listen(443);
}
