require('dotenv').config({ path: 'config/.env' });
const app = require('./app');
const port = process.env.PORT;

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user to connected');
  // nhan du lieu tu client
  socket.on('chat', (msg) => {
    // gui du lieu den all client
    console.log(msg);
    io.emit('chat', 'hello ' + msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log('Server is on ' + port);
});
