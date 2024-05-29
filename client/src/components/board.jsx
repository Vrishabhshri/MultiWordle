import React, { useCallback, useEffect, useState, useRef } from 'react';
import "../styles/board.css";

function Board({ rows, columns, chosenWord }) {

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

  const checkMatch = useCallback(() => {

    let row = currRow.current;
    let newBoard = board.map(row => [...row]);

    // Keeping track of letter count to ensure more than required yellows are not shown

    let letterCount = {};

    for (let i = 0; i < newBoard[row].length; i++) {

      letterCount[newBoard[row][i].letter] = (letterCount[newBoard[row][i].letter] || 0) + 1;

    }

    // First pass to check for green letters

    for (let i = 0; i < newBoard[row].length; i++) {

      if (newBoard[row][i].letter === chosenWord[i]) {

        newBoard[row][i].status = 'green';
        letterCount[newBoard[row][i].letter]--;

      }

    }

    // Second pass to check for yellow and gray letters

    for (let i = 0; i < newBoard[row].length; i++) {

      if (newBoard[row][i].status === '') {

        if (chosenWord.includes(newBoard[row][i].letter) && letterCount[newBoard[row][i].letter] > 0) {

          newBoard[row][i].status = 'yellow';
          letterCount[newBoard[row][i].letter]--;
  
        }
        else {
  
          newBoard[row][i].status = 'gray';
  
        }

      }

    }

    setBoard(newBoard);

    if (currRow.current < 5) {

      currRow.current++;
      currCol.current = 0;

    }
    else { 
      // Output that you lost 
    }

  }, [currCol, currRow, board, chosenWord]);

  const handleLetter = useCallback((e) => {

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
  }, [addLetter, deleteLetter, checkMatch, wordLengthValid]);

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

export default Board;