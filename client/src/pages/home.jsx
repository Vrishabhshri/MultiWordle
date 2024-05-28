import "../styles/universal.css";
import "../styles/home.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

export default function Home() {

    const navigate = useNavigate();
    const [IDValue, setIDValue] = useState('');
    const [nameValue, setNameValue] = useState('');

    const handlePlayButtonClick = () => {

        handleRoom(nameValue);
        navigate('/waiting-room');
        
    }

    const generateRoomID = () => {

        return "XXVBHG";

    }

    const createRoom = (name) => {

        let roomID = generateRoomID();

        socket.emit('create-room', { roomID, name });

    }

    const joinRoom = (roomID, name) => {

        if (roomID.length === 6) {

            socket.emit('join-room', { roomID, name });

        }
        else {

            console.log('Enter valid ID');

        }

    }

    const handleRoom = (name) => {

        if (IDValue.trim() === '') createRoom(name);
        else joinRoom(IDValue.trim(), name);

    }

    const handleIDChange = (e) => {

        setIDValue(e.target.value);

    };

    const handleNameChange = (e) => {

        setNameValue(e.target.value);

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

            <input id="enter-name-input" className="input-box" type="text" value={nameValue} onChange={handleNameChange} placeholder="Enter name"/>
            
            <button id="play-button" onClick={handlePlayButtonClick}>Play</button>

            <div id="enter-code">

                Or enter a code

            </div>

            <input id="enter-code-input" className="input-box" type="text" value={IDValue} onChange={handleIDChange} placeholder="Create room"/>
            <div id="input-text">Leave blank to create room</div>

        </div>

    );

}