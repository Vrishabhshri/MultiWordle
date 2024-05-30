import React from 'react'
import Board2 from '../components/chooser-board.jsx';
import Keyboard from '../components/keyboard';

function ChooserBoard() {

  return (

    <div id="main">

        <Board2 rows={1} columns={5}></Board2>

        <Keyboard></Keyboard>

    </div>

  );

}

export default ChooserBoard;