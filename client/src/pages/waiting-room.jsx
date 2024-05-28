import React, { useState } from 'react';
import "../styles/waiting-room.css";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function WaitingRoom() {

  const [codeValue, setCodeValue] = useState('');
  const players = [];

  socket.on('get-room-id', ID => {

    setCodeValue(ID);

  });

  socket.on('load-player', player => {

    players.push(player);

  });

  return (

    <div id="main">

        <div id="code-title">
            
            Your code is:

        </div>

        <div id="code">

            {codeValue}

        </div>

        <div id="players-box">

          {players.map(player => (

            <div id="player-box">{player.name}</div>

          ))};

        </div>

    </div>

  );

}

export default WaitingRoom;