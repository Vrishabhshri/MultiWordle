const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { info } = require('console');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: ["http://localhost:3000"]
    }
    
});

const rooms = [];

// Room handling with sockets

io.on('connection', socket => {

    socket.on('get-room-data', info => {

        socket.emit('load-room-data', { players: rooms[info.roomID].players.map(player => player.name) });

    });

    socket.on('disconnect', () => {
        // Handle player disconnect
    });

});


// Room handling with fetch requests 
app.post('/create-room', async (req, res) => {

    let info = req.query;
    let roomID = info.roomID;
    let name = info.name

    rooms[roomID] = {playerCount: 1, players: [{playerID: 1, name: name, ready: false}]};

    res.json({playerID: 1, name: name, roomID: roomID});
    
});

app.get('/join-room', async (req, res) => {

    let info = req.query;
    let roomID = info.roomID;
    let name = info.name

    if (rooms[roomID]) {

        let newID = ++rooms[roomID].playerCount;

        rooms[roomID].players.push({playerID: newID, name: name, ready: false});

        res.status(200).json({playerID: newID, name: name, roomID: roomID});

    }
    else {

        res.sendStatus(500);

    }
    
});

server.listen(3001, () => {

    console.log("Server started")

});