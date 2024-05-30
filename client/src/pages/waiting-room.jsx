import React, { useState, useEffect } from 'react';
import "../styles/waiting-room.css";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import socketInstance from '../scripts/websocket';

function WaitingRoom() {

  const searchParams = new URLSearchParams(window.location.search);

  const name = searchParams.get('name');
  const playerID = searchParams.get('playerID');
  const roomID = searchParams.get('roomID');
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  socketInstance.emit('get-room-data', {roomID: roomID});

  socketInstance.on('load-room-data', (data) => {

    setPlayers(data.players);

  });

  const changeReadyStatus = () => {

    socketInstance.emit('all-ready', {playerID: playerID, roomID: roomID});

  }

  socketInstance.on('chosen-player', chosenID => {

    if (chosenID.toString() === playerID) navigate('/chooser-board');
    else navigate('/guesser-waiting');

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