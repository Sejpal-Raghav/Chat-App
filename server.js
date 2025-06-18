import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { handleLogin } from './routes/loginFunctionality.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/chatroom', handleLogin);
app.get('/chatroom', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'general.html'));
});

// Socket.io connection
const users = {};
io.on('connection', (socket) => {
    // When a new user joins
    socket.on('new-user', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
        // Broadcast updated user list and count
        io.emit('user-list', Object.values(users));
        io.emit('user-count', Object.keys(users).length);
    });

    // When a user sends a chat message
    socket.on('send-chat-message', (message) => {
        // Look up username from users mapping
        const name = users[socket.id] || 'Anonymous';
        io.emit('chat-message', {
            message,
            name
        });
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            socket.broadcast.emit('user-disconnected', users[socket.id]);
            delete users[socket.id];
            // Broadcast updated user list and count
            io.emit('user-list', Object.values(users));
            io.emit('user-count', Object.keys(users).length);
        }
    });
});

server.listen(PORT, () => {
    console.log('Server running!');
});