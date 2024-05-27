import React, { useEffect } from 'react'
import Board from '../components/board';
import Keyboard from '../components/keyboard';

function GuesserBoard() {

  let currentRow = 0;
  let currentCol = 0;

  return (

    <div id="main">

        <Board rows={6} columns={5}></Board>

        <Keyboard></Keyboard>

    </div>

  );

}

export default GuesserBoard;