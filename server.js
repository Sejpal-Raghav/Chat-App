import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import { handleLogin } from './routes/loginFunctionality.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
    let requestedPath = req.url === '/' ? '/index.html' : req.url;

if (!path.extname(requestedPath)) {
  requestedPath += '.html';
}

let filename = path.join(__dirname, 'public', requestedPath);

    const ext = path.extname(filename);
    let contentType = 'text/html';

    switch(ext){
        case '.js': contentType = 'text/javascript';break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'text/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
    }

    if (req.method === 'POST' && req.url === '/chatPage') {
    handleLogin(req, res);
    return;
}

    fs.readFile(filename, (err, content)=>{
            if(err){
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end('404 Not Found')
            }
            else{
            res.writeHead(200, {'Content-Type': contentType})
            res.write(content);
            res.end();
            }
        })
    })

const io = new Server(server);

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });

    socket.on('send-chat-message', (message) => {
        socket.broadcast.emit('chat-message', {
            message, name: users[socket.id]
        });
    });

    socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
});
});

server.listen(5000, () => {
    console.log('Server running localhost:5000');
});