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
  // const playerInfo = JSON.parse(ls.getItem('playerInfo'));
  // const name = playerInfo.name;
  // const playerID = playerInfo.playerID;
  // const roomID = playerInfo.roomID;
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  // console.log(`${name}-${playerID}-${roomID}`)

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

    socket.emit('all-ready', {playerID: playerID, roomID: roomID});

  }

  // Checks to see whether player was chosen to be chooser
  socket.on('chosen-player', chosenID => {

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

        <button id="ready-button" onClick={changeReadyStatus}>Ready</button>

    </div>

  );

}

export default WaitingRoom;