import { io } from 'socket.io-client';
// import Game from '../js-models/Game.js';

const socket = io('http://localhost:3000');

// Showing intructions when how-to-play button clicked

const howToPlayButton = document.getElementById('how-to-play-button');
const instructions = document.getElementsByClassName('instructions')[0];

function showInstructions() {

    instructions.classList.toggle('showInstructions');

}

howToPlayButton.addEventListener('click', () => showInstructions());

// Starting new game when play button clicked

const playButton = document.getElementById('play-button');

playButton.addEventListener('click', () => {

    const code = document.getElementById('enter-code-input').value;

    // Checking whether a code was given or whether a new game was to be made

    if (code === '') {

        // Create new game and assign it a random ID

        let gameID = generateRoom();

        window.localStorage.setItem('gameID', gameID);

        // createGame(gameID);
        
        socket.emit('join-room', gameID);

        window.location.href = 'waiting-room.html';

    }
    else {

        // Check if game id exists in db

        // let codeResponse = await fetch(`${URL}/load-game?id=${code}`, {
        //     method: "GET"
        // });

        socket.emit('join-room', code);
        window.location.href = 'waiting-room.html';
        
    }

});

// TODO: implement random room generator
function generateRoom() {

    return 'XXVGBH';

}