import React, { useEffect, useState } from 'react';
import "../styles/board.css";

function Board({ rows, columns }) {

  let currRow = 0;
  let currCol = 0;

  let [board, setBoard] = useState(Array.from(Array(rows), () => new Array(columns).fill('')));

  const addLetter = (letter) => {

    if (currCol < 5) {

      let newBoard = board.map(row => [...row]);
      newBoard[currRow][currCol] = letter;

      setBoard(newBoard);
      board = newBoard;

      currCol++;

    }

  }

  const deleteLetter = (letter) => {

    

  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === `Key${e.key.toUpperCase()}`){
        
        console.log(e.key);
        addLetter(e.key.toUpperCase());

      }

    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

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