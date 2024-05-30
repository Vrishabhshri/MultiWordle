import React from 'react'
import Board from '../components/chooser-board.jsx';
import Keyboard from '../components/keyboard';

function ChooserBoard() {

  return (

    <div id="main">

        <Board rows={1} columns={5}></Board>

        <Keyboard></Keyboard>

    </div>

  );

}

export default ChooserBoard;