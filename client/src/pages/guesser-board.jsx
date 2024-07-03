import React from 'react'
import Board from '../components/board.jsx';
import Keyboard from '../components/keyboard';

function GuesserBoard() {

  const searchParams = new URLSearchParams(window.location.search);
  const roomID = searchParams.get('roomID');
  const word = searchParams.get('word');
  const name = searchParams.get('name');
  const playerID = searchParams.get('playerID');

  return (

    <div id="main">

        <Board rows={6} columns={5} chosenWord={word} roomID={roomID} playerID={playerID} name={name}></Board>

        <Keyboard></Keyboard>

    </div>

  );

}

export default GuesserBoard;