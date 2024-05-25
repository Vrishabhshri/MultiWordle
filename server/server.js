// // Socket handling

// const io = require('socket.io')(3000, {
//     cors: {
//         origin: ['http://localhost:8080']
//     }
// });

// io.on('connection', socket => {

//     socket.on('join-room', roomID => {

//         socket.join(roomID);
//         socket.emit('change-page');

//     });

// })

// // PouchDB

// const PouchDB = require('pouchdb');
// const gamesDB = new PouchDB('games');

// // Creating game
// async function createGame(game) {

//     await gamesDB.post(game);

// }

// // Updating game
// async function updateGame(game) {

//     await gamesDB.put(game);

// }

// // Loading game
// async function loadGame(gameID) {

//     const game = await gamesDB.get(gameID);
//     return game;

// }

// // Deleting game
// async function deleteGame(gameID) {

//     await gamesDB.remove(gameID);

// }

// // Route handling

// const express = require('express');

// const app = express();
// const port = 3000;

// app
// .route('/create-game')
// .post(async (req, res) => {

//     try {

//         let game = req.body;
//         await createGame(game);
//         res.status(200);

//     }
//     catch (err) {

//         console.log(err);

//     }

// });

// app
// .route('/load-game')
// .get(async (req, res) => {

//     try {

//         let options = req.query;
//         let game = await loadGame(options.id);
//         res.json(game).status(200);

//     }
//     catch (err) {

//         res.send("Game does not exist").status(500);

//     }

// })