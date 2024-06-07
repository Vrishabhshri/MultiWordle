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

// TODO: Need to fix io.emit() to only emit to rooms and not every socket

io.on('connection', socket => {

    socket.on('create-room', info => {

        socket.join(info.roomID);

    });

    socket.on('join-room', info => {

        socket.join(info.roomID);

    });

    socket.on('get-room-data', info => {

        socket.emit('load-room-data', { players: rooms[info.roomID].players.map(player => player.name) });

    });

    socket.on('all-ready', status => {

        if (++rooms[status.roomID].readyCount === rooms[status.roomID].playerCount) {

            let chosenID = Math.floor(Math.random() * rooms[status.roomID].playerCount + 1);

            io.to(status.roomID).emit('chosen-player', chosenID);

        }

    })

    socket.on('give-word-server', word => {

        io.emit('give-word-guesser', word);

    })

    socket.on('disconnect', () => {
        // Handle player disconnect
    });

});


// Room handling with fetch requests 
app.post('/create-room', async (req, res) => {

    let info = req.query;
    let roomID = info.roomID;
    let name = info.name

    // Ensure room does not exist before creating it
    if (Object.keys(rooms).includes(roomID)) res.sendStatus(500);

    else {

        rooms[roomID] = {playerCount: 1, readyCount: 0, players: [{playerID: 1, name: name, ready: false}]};

        res.status(200).json({playerID: 1, name: name, roomID: roomID});

    }
    
});

app.get('/join-room', async (req, res) => {

    let info = req.query;
    let roomID = info.roomID;
    let name = info.name

    // Ensure rooms exists before joining
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