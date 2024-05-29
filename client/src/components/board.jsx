import React, { useCallback, useEffect, useState, useRef } from 'react';
import "../styles/board.css";

function Board({ rows, columns, chosenWord }) {

  let currRow = useRef(0);
  let currCol = useRef(0);

  let [board, setBoard] = useState(Array.from(Array(rows), () => new Array(columns).fill('')));

  const addLetter = useCallback((letter) => {

    if (currCol.current <= 4) {

      let newBoard = board.map(row => [...row]);
      newBoard[currRow.current][currCol.current] = letter;

      currCol.current++;

      setBoard(newBoard);

    }

  }, [board, currCol, currRow]);

  const deleteLetter = useCallback(() => {

    if (currCol.current-1 >= 0) {

      let newBoard = board.map(row => [...row]);
      newBoard[currRow.current][currCol.current-1] = '';

      setBoard(newBoard);

      if (currCol.current > 0) currCol.current--;

    }

  }, [currCol, board, currRow]);

  const wordLengthValid = useCallback(() => {

    if (currCol.current < 5) return false;
    else return true;

  }, [currCol]);

  const handleLetter = (e) => {

    if (e.code === `Key${e.key.toUpperCase()}`){
        
      addLetter(e.key.toUpperCase());

    }
    else if (e.code === 'Backspace') {

      deleteLetter();

    }
    else if (e.code === 'Enter') {

      if (wordLengthValid()) {
        
        console.log("valid word");

      }
      else console.log("need to enter a valid word");

      checkMatch();

    }
  };

  const checkMatch = () => {

    let row = currRow.current;

    for (let i = 0; i < board[row].length; i++) {

      // Add implementation to only show letters yellow once if they are only in the word once

      if (board[row][i] === chosenWord[i]) {

        // Add green class to box

      } else if (chosenWord.includes(board[row][i])) {

        // Add yellow class to box

      } else {

        // Add gray class

      }

    }

    if (currRow.current < 5) {

      currRow.current++;
      currCol.current = 0;

    }
    else { 
      // Output that you lost 
    }

  };

  useEffect(() => {
    function handleKeyDown(e) {

      handleLetter(e);

    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [addLetter, deleteLetter, wordLengthValid]);

  return (
    

    <div id="wordle-container">

    {board.map((row, rowIndex) => (

        <div key={rowIndex} className="wordle-row">

        {row.map((col, colIndex) => (

            <div key={colIndex} className="wordle-box">

            {col}

            </div>

        ))}

        </div>

    ))}

    </div>

  );

}

export default Board;