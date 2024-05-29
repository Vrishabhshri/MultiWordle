import React from 'react'
import Board from '../components/board';
import Keyboard from '../components/keyboard';

function GuesserBoard() {

  return (

    <div id="main">

        <Board rows={6} columns={5} chosenWord={"HELLO"}></Board>

        <Keyboard></Keyboard>

    </div>

  );

}

export default GuesserBoard;