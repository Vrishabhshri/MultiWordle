import React, { useState } from 'react';
import "../styles/board.css";

function Board({ rows, columns }) {

  const [board, setBoard] = useState(Array.from(Array(rows), () => new Array(columns).fill('')));

  return (
    
    <div id="main">

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

      <div id="keyboard">

      </div>

    </div>

  );

}

export default Board;