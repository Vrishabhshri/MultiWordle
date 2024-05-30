import React, { useCallback, useEffect, useState, useRef } from 'react';
import "../styles/board.css";
import { useNavigate } from 'react-router-dom';
import socketInstance from '../scripts/websocket';

function Board2({ rows, columns }) {

  const navigate = useNavigate();  
  let currRow = useRef(0);
  let currCol = useRef(0);

  let [board, setBoard] = useState(
    Array.from(Array(rows), () =>
      Array.from(Array(columns), () => ({ letter: '', status: '' }))
    )
  );

  const addLetter = useCallback((letter) => {

    if (currCol.current <= 4) {

      let newBoard = board.map(row => [...row]);
      newBoard[currRow.current][currCol.current].letter = letter;

      currCol.current++;

      setBoard(newBoard);

    }

  }, [board, currCol, currRow]);

  const deleteLetter = useCallback(() => {

    if (currCol.current-1 >= 0) {

      let newBoard = board.map(row => [...row]);
      newBoard[currRow.current][currCol.current-1].letter = '';

      setBoard(newBoard);

      if (currCol.current > 0) currCol.current--;

    }

  }, [currCol, board, currRow]);

  const wordLengthValid = useCallback(() => {

    if (currCol.current < 5) return false;
    else return true;

  }, [currCol]);

  const wordValid = () => {

    // Check dictionary to see if it's a valid word

  }

  const turnGreen = useCallback(() => {

    let newBoard = board.map(row => [...row]);

    for (let i = 0; i < newBoard[currRow.current].length; i++) {

        newBoard[currRow.current][i].status = 'green';

    }

    setBoard(newBoard);

  }, [currRow, board]);

  const handleSwitch = useCallback(() => {

    let word = '';

    for (let i = 0; i < board[currRow.current].length; i++) {

        word += board[currRow.current][i].letter;

    }

    socketInstance.emit('give-word-server', word);

    navigate('/chooser-waiting');

  }, [board, navigate]);

  const handleLetter = useCallback((e) => {

    if (e.code === `Key${e.key.toUpperCase()}`){
        
      addLetter(e.key.toUpperCase());

    }
    else if (e.code === 'Backspace') {

      deleteLetter();

    }
    else if (e.code === 'Enter') {

      if (wordLengthValid() && wordValid()) {
        


      }
      else console.log("need to enter a valid word");

      turnGreen();

      handleSwitch();

    }
  }, [addLetter, deleteLetter, turnGreen, wordLengthValid, handleSwitch]);

  useEffect(() => {
    function handleKeyDown(e) {

      handleLetter(e);

    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleLetter]);

  return (
    
    <div id="wordle-container">

    {board.map((row, rowIndex) => (

        <div key={rowIndex} className="wordle-row">

        {row.map((box, colIndex) => (

            <div key={`${rowIndex}-${colIndex}`} className={`wordle-box ${box.status}`}>

            {box.letter}

            </div>

        ))}

        </div>

    ))}

    </div>

  );

}

export default Board2;