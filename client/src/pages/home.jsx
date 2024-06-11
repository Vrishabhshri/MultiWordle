import "../styles/universal.css";
import "../styles/home.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketInstance from '../scripts/websocket';

export default function Home() {

    // Initialize navigate, name and ID (if any)
    const navigate = useNavigate();
    const [IDValue, setIDValue] = useState('');
    const [nameValue, setNameValue] = useState('');

    // Handles when play button is clicked
    const handlePlayButtonClick = async () => {

        let playerInfo = await handleRoom(nameValue);

        if (playerInfo && playerInfo.roomID && playerInfo.name && playerInfo.playerID) 
            navigate(`/waiting-room?roomID=${playerInfo.roomID}&name=${playerInfo.name}&playerID=${playerInfo.playerID}`);
        
    }

    // Generates room ID
    const generateRoomID = () => {

        return "XXVBHG";

    }

    // Creating a room
    const createRoom = async (name) => {

        try {

            let roomID = generateRoomID();

            let playerInfo = await fetch(`http://localhost:3001/create-room?roomID=${roomID}&name=${name}`, {

                method: "POST"

            });

            if (playerInfo.status === 200) {

                let playerInfoData = await playerInfo.json();

                socketInstance.emit('create-room', { roomID, name } )

                return playerInfoData;

            }

            else {

                alert('There was a problem in creating a room, try again');
                return null;

            }

        }
        catch (err) {

            console.log(err);

        }

    }

    // Joining a player to a room
    const joinRoom = async (roomID, name) => {

        if (roomID.length === 6) {

            try {
    
                let playerInfo = await fetch(`http://localhost:3001/join-room?roomID=${roomID}&name=${name}`, {
    
                    method: "GET"
    
                });

                if (playerInfo.status === 200) {

                    let playerInfoData = await playerInfo.json();

                    socketInstance.emit('join-room', { roomID, name } )

                    return playerInfoData;

                }
                else {

                    alert('Could not find room');

                }
    
            }
            catch (err) {
    
                alert("There was an internal server error");
    
            }

        }
        else {

            alert('Enter valid ID');

        }

    }

    // Handle whether to join or create a room
    const handleRoom = async (name) => {

        if (IDValue.trim() === '') {

            return await createRoom(name);

        }
        else return await joinRoom(IDValue.trim(), name);

    }

    // Handles ID input being changed
    const handleIDChange = (e) => {

        setIDValue(e.target.value);

    };

    // Handles name input being changed
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