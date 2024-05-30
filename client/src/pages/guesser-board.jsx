import React from 'react'
import Board from '../components/guesser-board';
import Keyboard from '../components/keyboard';

function GuesserBoard() {

  const searchParams = new URLSearchParams(window.location.search);

  const word = searchParams.get('word');

  return (

    <div id="main">

        <Board rows={6} columns={5} chosenWord={word}></Board>

        <Keyboard></Keyboard>

    </div>

  );

}

export default GuesserBoard;