import React, { useState } from 'react';
import "../styles/waiting-room.css";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function WaitingRoom() {

  const [codeValue, setCodeValue] = useState('');
  const [players, setPlayers] = useState([]);
  
  socket.on('load-room-data', (data) => {
      setCodeValue(data.roomID);
      setPlayers(data.players);
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

            <div id="player-box" key="player">{player}</div>

          ))}

        </div>

    </div>

  );

}

export default WaitingRoom;