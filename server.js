import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import { handleLogin } from './routes/loginFunctionality.js';
import { config } from './public/config/config.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  
  res.setHeader("Access-Control-Allow-Origin", config.apiUrl);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }


  let requestedPath = req.url === '/' ? '/index.html' : req.url;

  if (!path.extname(requestedPath)) {
    requestedPath += '.html';
  }

  let filename = path.join(__dirname, 'public', requestedPath);
  const ext = path.extname(filename);
  let contentType = 'text/html';

  switch (ext) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.json': contentType = 'application/json'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpeg'; break;
    case '.svg': contentType = 'image/svg+xml'; break;
  }

  if (req.method === 'POST' && req.url === '/chatPage') {
    handleLogin(req, res);
    return;
  }

  fs.readFile(filename, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const io = new Server(server, {
  cors: {
    origin: config.apiUrl,
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});