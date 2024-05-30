import React, { useState, useEffect } from 'react';
import "../styles/waiting-room.css";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io.connect("http://localhost:3001");

function WaitingRoom() {

  const searchParams = new URLSearchParams(window.location.search);

  const name = searchParams.get('name');
  const playerID = searchParams.get('playerID');
  const roomID = searchParams.get('roomID');
  const [codeValue, setCodeValue] = useState('');
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  socket.emit('get-room-data', {roomID: roomID});
  
  socket.on('load-room-data', (data) => {

    setPlayers(data.players);

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

          {players.map(player => (

            <div className="player" key={playerID}>{player}</div>

          ))}

        </div>

        <button id="play-button">Play</button>

    </div>

  );

}

export default WaitingRoom;