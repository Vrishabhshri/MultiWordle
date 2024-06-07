import React, { useState } from 'react';
import "../styles/waiting-room.css";
import { useNavigate } from 'react-router-dom';
import socketInstance from '../scripts/websocket';

function WaitingRoom() {

  console.log(socketInstance.getSocket().id);

  const searchParams = new URLSearchParams(window.location.search);

  // const name = searchParams.get('name');
  const playerID = searchParams.get('playerID');
  const roomID = searchParams.get('roomID');
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  // Signaling server to send data about waiting room
  socketInstance.emit('get-room-data', {roomID: roomID});

  // Loading data from server
  socketInstance.on('load-room-data', (data) => {

    setPlayers(data.players);

  });

  /* Pretty sure this doesn't work to replace the sockets above since the objects would be 
  stringified and then brought back to an object so it wouldn't modify as new players joined */

  // Loading players info to display
  // const playerInfo = await fetch(`http://localhost:3001/load-room-data?roomID=${roomID}`, {

  //   method: "GET"

  // });

  // if (playerInfo.status === 200) {

  //   let data = await playerInfo.json();
  //   console.log(data.players);

  //   setPlayers(data.players);

  // }

  // Alerting server that player is ready
  const changeReadyStatus = () => {

    socketInstance.emit('all-ready', {playerID: playerID, roomID: roomID});

  }

  // Checks to see whether player was chosen to be chooser
  socketInstance.on('chosen-player', chosenID => {

    if (chosenID.toString() === playerID) navigate(`/chooser-board?roomID=${roomID}`);
    else navigate(`/guesser-waiting?roomID=${roomID}`);

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