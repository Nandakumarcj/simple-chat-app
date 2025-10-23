const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// simple in-memory message store (capped)
const MAX_MESSAGES = 200;
const messages = [];

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // send recent messages to new client
  socket.emit('load-history', messages);

  socket.on('join', (name) => {
    socket.data.name = name || 'Anonymous';
    socket.broadcast.emit('system-message', { text: `${socket.data.name} joined the chat.`, time: new Date().toISOString() });
  });

  socket.on('chat-message', (msg) => {
    const message = {
      id: Date.now() + '-' + Math.random().toString(36).slice(2,8),
      name: socket.data.name || 'Anonymous',
      text: String(msg),
      time: new Date().toISOString()
    };
    messages.push(message);
    if (messages.length > MAX_MESSAGES) messages.shift();
    io.emit('chat-message', message);
  });

  socket.on('disconnect', (reason) => {
    if (socket.data.name) {
      socket.broadcast.emit('system-message', { text: `${socket.data.name} left the chat.`, time: new Date().toISOString() });
    }
    console.log('Client disconnected:', socket.id, reason);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
