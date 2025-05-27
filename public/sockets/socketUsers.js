export function socketUsers(params) {
    const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name;
    socket.broadcast.it('user-connected', name);
  });

  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message,
      name: users[socket.id]
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});}