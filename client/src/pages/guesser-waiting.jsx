import React from 'react'
import "../styles/guesser-waiting.css"
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

function GuesserWaiting() {

    const socket = io.connect("http://localhost:3001");
    const navigate = useNavigate();  

    socket.on('give-word-guesser', word => {

        navigate(`/guesser-board?word=${word}`);

    })

    return (

        <div id="message"> Waiting for chooser to pick a word... </div>

    )

}

export default GuesserWaiting