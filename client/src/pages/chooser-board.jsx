import React from 'react'
import Board from '../components/board';

function ChooserBoard() {

  return (

    <div id="main">

        <Board rows={1} columns={5}></Board>

    </div>

  );

}

export default ChooserBoard;