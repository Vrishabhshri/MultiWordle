import "../styles/universal.css";
import "../styles/home.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

export default function Home() {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handlePlayButtonClick = () => {

        handleRoom();
        navigate('/waiting-room');
        
    }

    const generateRoomID = () => {

        return "XXVBHG";

    }

    const createRoom = () => {

        let ID = generateRoomID();

        socket.emit('create-room', ID);

    }

    const joinRoom = (ID) => {

        if (ID.length === 6) {

            socket.emit('join-room', ID);

        }
        else {

            console.log('Enter valid ID');

        }

    }

    const handleRoom = () => {

        if (inputValue.trim() === '') createRoom();
        else joinRoom(inputValue.trim());

    }

    const handleInputChange = (e) => {

        setInputValue(e.target.value);

    };

    return (

        <div id="main">

            <div id="title-bar">

                <div id="title">

                    Multi-Wrdle

                </div>

            </div>

            <div id="how-to-play-button">

                How to Play

            </div>

            <div className="instructions">

                The game is like world and other instructions will go here...

            </div>
            
            <button id="play-button" onClick={handlePlayButtonClick}>Play</button>

            <div id="enter-code">

                Or enter a code

            </div>

            <input id="enter-code-input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Create room"/>
            <div id="input-text">Leave blank to create room</div>

        </div>

    );

}