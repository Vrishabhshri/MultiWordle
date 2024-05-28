const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: ["http://localhost:3000"]
    }
    
});

const rooms = [];

// Room handling

io.on('connection', socket => {

    // Creating a room

    socket.on('create-room', (info) => {

        // Creating a new room in database and initializing it with player info
        rooms[info.roomID] = [{id: 1, name: info.name, ready: false}];
        socket.join(info.roomID);

        
        
        // Sending room ID and player info back to client to display on their waiting room
        io.emit('load-room-data', { roomID: info.roomID, players: rooms[info.roomID].map(player => player.name) });
    });

    // Joining a room

    socket.on('join-room', (info) => {

        // Checking to see if room exists
        if (rooms[info.roomID]) {

            // Joining the room
            socket.join(info.roomID);
            rooms[info.roomID].push({id: socket.id, name: info.name, ready: false});

            // Sending room ID and player info back to client to display on their waiting room
            io.emit('load-room-data', { roomID: info.roomID, players: rooms[info.roomID].map(player => player.name) });
        } else {

            // Alerting if room is not found
            console.log('Room not found');

        }
    });

    

    socket.on('disconnect', () => {
        // Handle player disconnect
    });

});

server.listen(3001, () => {

    console.log("Server started")

});