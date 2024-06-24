import React from 'react';
import "../styles/guesser-waiting.css";
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function GuesserWaiting() {

    const navigate = useNavigate();  
    const searchParams = new URLSearchParams(window.location.search);
    const roomID = searchParams.get('roomID');
    const name = searchParams.get('name');
    const playerID = searchParams.get('playerID');

    const socket = io("http://localhost:3001");

    socket.emit('join-room', roomID);

    socket.on('give-word-guesser', word => {

        socket.disconnect();
        navigate(`/guesser-board?roomID=${roomID}&name=${name}&playerID=${playerID}&word=${word}`);

    });

    return (

        <div id="message"> Waiting for chooser to pick a word... </div>

    )

}

export default GuesserWaiting