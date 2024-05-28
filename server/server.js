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

    // socket.on('create-room', (ID) => {

    //     io.emit('get-room-id', ID);
    //     rooms[ID] = [socket.id];
    //     // console.log(rooms);

    //     socket.emit('load-player', socket.id);
    
    // });

    // socket.on('join-room', ID => {

    //     if (Object.keys(rooms).includes(ID)) {

    //         io.emit('get-room-id', ID);
    //         rooms[ID].push(socket.id);
    //         // console.log(rooms);

    //         socket.emit('load-player', socket.id);

    //     }

    // })

    socket.on('create-room', (roomID) => {
        rooms[roomID] = [socket.id];
        socket.join(roomID);
        io.emit('load-room-data', { roomID, players: rooms[roomID] });
    });

    socket.on('join-room', (roomID) => {
        if (rooms[roomID]) {
            socket.join(roomID);
            rooms[roomID].push(socket.id)
            io.emit('load-room-data', { roomID, players: rooms[roomID] });
        } else {
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