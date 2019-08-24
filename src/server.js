const express = require('express');
const routes = require('./routes');
const moongose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const cookieParser = require('cookie-parser');
const TicTacToe = require('./Controllers/TicTacToeController');

const app = express();

const server = require('http').Server(app);

const connectedUsers = {};

const io = require('socket.io')(server);
io.on('connection', socket => {
   const { user } = socket.handshake.query;
   connectedUsers[user] = socket.id;
   socket.on('startPlay', gameState => {
      TicTacToe.startMatch(gameState, io, connectedUsers);
   });
});
const port = process.env.PORT || 3001;
const connectionString = process.env.CONNECTION_STRING;

moongose.connect(connectionString,
{
   useNewUrlParser: true
});

app.use((req, res, next) => {
   req.io = io;
   req.connectedUsers = connectedUsers;
   next();
});
app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

server.listen(port, () => {
   console.log(`Server running on port ${port}`); 
});