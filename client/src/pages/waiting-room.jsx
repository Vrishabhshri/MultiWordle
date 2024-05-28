import React, { useState } from 'react';
import "../styles/waiting-room.css";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function WaitingRoom() {

  let ID;
  const [codeValue, setCodeValue] = useState('');

  socket.on('get-room-id', id => {

    ID = id;
    setCodeValue(ID);

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

            

        </div>

    </div>

  );

}

export default WaitingRoom;