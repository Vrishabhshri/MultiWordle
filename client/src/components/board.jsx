import React, { useCallback, useEffect, useState, useRef } from 'react';
import "../styles/board.css";
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function Board({ rows, columns, chosenWord, roomID, playerID, name }) {

  const socket = io("http://localhost:3001");

  socket.emit('join-room', roomID);

  // Initializing navigate, column and row position, and board
  let currRow = useRef(0);
  let currCol = useRef(0);
  const navigate = useNavigate();

  let [board, setBoard] = useState(
    Array.from(Array(rows), () =>
      Array.from(Array(columns), () => ({ letter: '', status: '' }))
    )
  );

  // Adds letter to board and updates board and current column position
  const addLetter = useCallback((letter) => {

    if (currCol.current <= 4) {

      let newBoard = board.map(row => [...row]);
      newBoard[currRow.current][currCol.current].letter = letter;

      currCol.current++;

      setBoard(newBoard);

    }

  }, [board, currCol, currRow]);

  // Deletes letter from the board and updates the board and current column position
  const deleteLetter = useCallback(() => {

    if (currCol.current-1 >= 0) {

      let newBoard = board.map(row => [...row]);
      newBoard[currRow.current][currCol.current-1].letter = '';

      setBoard(newBoard);

      if (currCol.current > 0) currCol.current--;

    }

  }, [currCol, board, currRow]);

  // Checks to ensure the word length is valid (could be gotten rid of since word can only be valid if it's five letters long)
  const wordLengthValid = useCallback(() => {

    if (currCol.current < 5) return false;
    else return true;

  }, [currCol]);

  // Checks to see whether current guess matches the chooser's word
  const checkMatch = useCallback(() => {

    let row = currRow.current;
    let newBoard = board.map(row => [...row]);

    // Keeping track of letter count to ensure more than required yellows are not shown
    let letterCount = {};

    for (let i = 0; i < chosenWord.length; i++) {

      letterCount[chosenWord[i]] = letterCount[chosenWord[i]] ? letterCount[chosenWord[i]] + 1 : 1;

    }

    // First pass to check for green letters
    let greenCount = 0;

    for (let i = 0; i < newBoard[row].length; i++) {

      if (newBoard[row][i].letter === chosenWord[i]) {

        newBoard[row][i].status = 'green';
        letterCount[newBoard[row][i].letter]--;
        greenCount++;

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

    if (greenCount === 5) {

      alert('You win');
      socket.emit('guesser-won');

    }

    if (currRow.current < 5) {

      currRow.current++;
      currCol.current = 0;

    }
    else { 

      // Output that you lose

    }

  }, [currCol, currRow, board, chosenWord]);

  // Handles event "Enter" and sends the words to the server and redirects to the chooser-waiting page
  const handleSwitch = useCallback(() => {

    let word = '';

    for (let i = 0; i < board[currRow.current].length; i++) {

        word += board[currRow.current][i].letter;

    }

    socket.emit('give-word-server', {word: word, roomID: roomID});
    socket.disconnect();
    navigate(`/chooser-waiting?roomID=${roomID}`);

  }, [board, navigate, roomID]);

  // Function to handle what key was pressed and which function to route action to
  const handleLetter = useCallback((e) => {

    if (e.code === `Key${e.key.toUpperCase()}`){
        
      addLetter(e.key.toUpperCase());

    }
    else if (e.code === 'Backspace') {

      deleteLetter();

    }
    else if (e.code === 'Enter') {

    //   checkValidWord();

      if (chosenWord) checkMatch();
      else handleSwitch();

    }
  }, [addLetter, deleteLetter, checkMatch]);

  // Handle key listening
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

            <div key={`${rowIndex}-${colIndex}`} className={`wordle-box ${box.status} box${colIndex}`}>

            {box.letter}

            </div>

        ))}

        </div>

    ))}

    </div>

  );

}

export default Board;