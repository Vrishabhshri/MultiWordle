import React from 'react';
import "../styles/keyboard.css";

function Keyboard() {

    let keyboard = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']];

    return (

        <div id='keyboard'>

            {keyboard.map((row, rowIndex) => (

                <div key={rowIndex} className='keyboard-row'>

                    {row.map((letter) => (

                        <div key={letter} className='keyboard-letter'>

                            {letter}

                        </div>

                    ))}

                </div>

            ))}

        </div>

    );

}

export default Keyboard