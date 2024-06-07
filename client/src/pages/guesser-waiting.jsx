import React from 'react';
import "../styles/guesser-waiting.css";
import { useNavigate } from 'react-router-dom';
import socketInstance from '../scripts/websocket';

function GuesserWaiting() {

    console.log(socketInstance.getSocket());

    const navigate = useNavigate();  
    const searchParams = new URLSearchParams(window.location.search);
    const roomID = searchParams.get('roomID');

    socketInstance.on('give-word-guesser', word => {

        navigate(`/guesser-board?word=${word}&roomID=${roomID}`);

    })

    return (

        <div id="message"> Waiting for chooser to pick a word... </div>

    )

}

export default GuesserWaiting