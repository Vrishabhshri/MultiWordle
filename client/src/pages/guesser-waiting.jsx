import React from 'react'
import "../styles/guesser-waiting.css"
import { useNavigate } from 'react-router-dom'
import socketInstance from '../scripts/websocket';

function GuesserWaiting() {

    const navigate = useNavigate();  

    socketInstance.on('give-word-guesser', word => {

        navigate(`/guesser-board?word=${word}`);

    })

    return (

        <div id="message"> Waiting for chooser to pick a word... </div>

    )

}

export default GuesserWaiting