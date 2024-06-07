import React from 'react'
import Board from '../components/chooserBoard.jsx';
import Keyboard from '../components/keyboard';

function ChooserBoard() {

  const searchParams = new URLSearchParams(window.location.search);
  const roomID = searchParams.get('roomID');

  return (

    <div id="main">

        <Board rows={1} columns={5} roomID={roomID}></Board>

        <Keyboard></Keyboard>

    </div>

  );

}

export default ChooserBoard;