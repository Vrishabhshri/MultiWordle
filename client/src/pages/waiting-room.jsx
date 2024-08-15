import React, { useState } from 'react';
import "../styles/waiting-room.css";
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function WaitingRoom() {

  const searchParams = new URLSearchParams(window.location.search);
  const socket = io("http://localhost:3001");
  const ls = window.localStorage;

  const name = searchParams.get('name');
  const playerID = searchParams.get('playerID');
  const roomID = searchParams.get('roomID');
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  
  const [color, setColor] = useState('white');

  // Joining socket room
  socket.emit('join-room', roomID);

  // Signaling server to send data about waiting room
  socket.emit('get-room-data', roomID);

  // Loading data from server
  socket.on('load-room-data', (data) => {

    setPlayers(data.players);

  });

  // Alerting server that player is ready
  const changeReadyStatus = () => {

    setColor((prevColor) => (prevColor === 'white' ? 'yellow' : 'white'));

    socket.emit('all-ready', {playerID: playerID, roomID: roomID});

  }

  // Checks to see whether player was chosen to be chooser
  socket.on('chosen-player', chosenID => {

    console.log("Reached chosen player");

    if (chosenID === playerID) {

      socket.disconnect();
      navigate(`/chooser-board?roomID=${roomID}&name=${name}&playerID=${playerID}`);

    }
    else {
      
      socket.disconnect();
      navigate(`/guesser-waiting?roomID=${roomID}&name=${name}&playerID=${playerID}`);

    }

  });

  return (

    <div id="main">

        <div id="code-title">
            
            Your code is:

        </div>

        <div id="code">

            {roomID}

        </div>

        <div id="players-box">

          <div id="players-title">Players: </div>

          {players.map((player, index) => (

            <div className="player" key={player.playerID || index}>{player}</div>

          ))}

        </div>

        <div id="ready-button-container">

          <button id="ready-button" onClick={changeReadyStatus} style={{color}}>Ready</button>

        </div>

    </div>

  );

}

export default WaitingRoom;