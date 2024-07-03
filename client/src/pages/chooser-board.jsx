import React from 'react'
import Board from '../components/board.jsx';
import Keyboard from '../components/keyboard';

function ChooserBoard() {

  const searchParams = new URLSearchParams(window.location.search);
  const roomID = searchParams.get('roomID');
  const name = searchParams.get('name');
  const playerID = searchParams.get('playerID');

  return (

    <div id="main">

        <Board rows={1} columns={5} roomID={roomID} playerID={playerID} name={name}></Board>

        <Keyboard></Keyboard>

    </div>

  );

}

export default ChooserBoard;