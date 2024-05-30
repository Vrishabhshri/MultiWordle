import "../styles/universal.css";
import "../styles/home.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();
    const [IDValue, setIDValue] = useState('');
    const [nameValue, setNameValue] = useState('');

    const handlePlayButtonClick = async () => {

        let playerInfo = await handleRoom(nameValue);

        if (playerInfo && playerInfo.roomID && playerInfo.name && playerInfo.playerID) 
            navigate(`/waiting-room?roomID=${playerInfo.roomID}&name=${playerInfo.name}&playerID=${playerInfo.playerID}`);
        
    }

    const generateRoomID = () => {

        return "XXVBHG";

    }

    const createRoom = async (name) => {

        try {

            let roomID = generateRoomID();

            let playerInfo = await fetch(`http://localhost:3001/create-room?roomID=${roomID}&name=${name}`, {

                method: "POST"

            });

            let playerInfoData = await playerInfo.json();

            return playerInfoData;

        }
        catch (err) {

            console.log(err);

        }

    }

    const joinRoom = async (roomID, name) => {

        if (roomID.length === 6) {

            try {
    
                let playerInfo = await fetch(`http://localhost:3001/join-room?roomID=${roomID}&name=${name}`, {
    
                    method: "GET"
    
                });

                if (playerInfo.status === 200) {

                    let playerInfoData = await playerInfo.json();

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

    const handleRoom = async (name) => {

        if (IDValue.trim() === '') {

            return await createRoom(name);

        }
        else return await joinRoom(IDValue.trim(), name);

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