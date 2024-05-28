import React, { useState } from 'react';
import "../styles/waiting-room.css";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io.connect("http://localhost:3001");

function WaitingRoom() {

  const [codeValue, setCodeValue] = useState('');
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  
  socket.on('load-room-data', (data) => {

    setCodeValue(data.roomID);
    setPlayers(data.players);

    showReadyButton();

  });

  const showReadyButton = () => {



  }

  const handleReadyButtonClick = () => {

    

  }

  return (

    <div id="main">

        <div id="code-title">
            
            Your code is:

        </div>

        <div id="code">

            {codeValue}

        </div>

        <div id="players-box">

          <div id="players-title">Players: </div>

          {players.map(player => (

            <div className="player" key="player">{player}</div>

          ))}

        </div>

        <button id="play-button" onClick={handleReadyButtonClick}>Play</button>

    </div>

  );

}

export default WaitingRoom;