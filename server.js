const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const root = __dirname;
const types = {
  '.html': 'text/html; charset=utf-8', '.json': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.js': 'text/javascript', '.css': 'text/css'
};
http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(file, (e, d) => {
    if (e) {
      fs.readFile(path.join(root, 'index.html'), (e2, d2) => {
        if (e2) { res.writeHead(404); res.end('not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(d2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(d);
  });
}).listen(port, () => console.log('payerpay up on ' + port));
