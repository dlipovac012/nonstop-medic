const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
const database = require('./database');

const { PORT = 8000 } = process.env;

// Middlewares
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Routes
app.use('/api/users', require('./users/routes'));
app.use('/api/auth', require('./auth/routes'));
app.use('/api/stream', require('./streaming/routes'));

// IO
io.on('connection', socket => {
    socket.on('join_room', (roomId, userId) => {
        // console.log(roomId);
        // console.log(userId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
    });

    socket.on('start_call', roomId => {
        socket.broadcast.to(roomId).emit('start_call');
    });

    socket.on('webrtc_offer', event => {
        socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp)
    });

    socket.on('webrtc_answer', (event) => {
        socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp);
    });

    socket.on('webrtc_ice_candidate', (event) => {
        socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event);
    });

    socket.on('join', (roomId) => {
        const roomClients = io.sockets.adapter.rooms[roomId] || { length: 0 }
        const numberOfClients = roomClients.length
    
        // These events are emitted only to the sender socket.
        if (numberOfClients == 0) {
          console.log(`Creating room ${roomId} and emitting room_created socket event`)
          socket.join(roomId)
          socket.emit('room_created', roomId)
        } else if (numberOfClients == 1) {
          console.log(`Joining room ${roomId} and emitting room_joined socket event`)
          socket.join(roomId)
          socket.emit('room_joined', roomId)
        } else {
          console.log(`Can't join room ${roomId}, emitting full_room socket event`)
          socket.emit('full_room', roomId)
        }
      });
});



database.sequelize.sync({ force: false }).then(() => {
    console.log('Database models synced');
});
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});