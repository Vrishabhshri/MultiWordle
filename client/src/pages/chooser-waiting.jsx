import React from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function ChooserWaiting() {

    const searchParams = new URLSearchParams(window.location.search);
    const roomID = searchParams.get('roomID');
    const name = searchParams.get('name');
    const playerID = searchParams.get('playerID');

    const socket = io("http://localhost:3001");

    socket.emit('join-room', roomID);

    return (

        <div>ChooserWaiting</div>

    )

}

export default ChooserWaiting