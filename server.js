const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const file = path.join(__dirname, 'index.html');
http.createServer((req, res) => {
  fs.readFile(file, (e, d) => {
    if (e) { res.writeHead(500); res.end('error'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(d);
  });
}).listen(port, () => console.log('payerpay concept up on ' + port));
