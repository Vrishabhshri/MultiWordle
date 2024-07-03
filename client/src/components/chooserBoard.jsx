import React, { useCallback, useEffect, useState, useRef } from 'react';
import "../styles/board.css";
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function Board({ rows, columns, roomID, playerID, name }) {

  const socket = io("http://localhost:3001");

  socket.emit('join-room', roomID);

  // Initializing navigate, column and row position, and board
  const navigate = useNavigate();  
  let currRow = useRef(0);
  let currCol = useRef(0);

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

  // Aesthetic to turn all boxes green when a valid word is chosen
  const turnGreen = useCallback(() => {

    let newBoard = board.map(row => [...row]);

    for (let i = 0; i < newBoard[currRow.current].length; i++) {

        newBoard[currRow.current][i].status = 'green';

    }

    setBoard(newBoard);

  }, [currRow, board]);

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

      // if (wordLengthValid() && wordValid()) {
        
        turnGreen();
        handleSwitch();

      // }
      // else console.log("need to enter a valid word");

    }
  }, [addLetter, deleteLetter, turnGreen, handleSwitch]);

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