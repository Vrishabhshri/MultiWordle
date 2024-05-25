export default class Board {

    #state;
    #rows;
    #columns;

    constructor(rows, columns) {

        this.#state = {grid: Array.from(Array(6), () => new Array(5).fill('')), currentRow: 0, currentColumn: 0};
        this.#rows = rows;
        this.#columns = columns;

    }

    resetBoard() {

        const board = document.getElementById('wordle-container');

        for (let row = 0; row < this.#rows; row++) {
    
            // Create div element for row
            let newRow = document.createElement('div');
            newRow.classList.add('wordle-row');
    
            for (let column = 0; column < this.#columns; column++) {
        
                // Create div element for box
                let newBox = document.createElement('div');
                newBox.classList.add('wordle-box');
                newBox.id = `box-${row}-${column}`
                newRow.appendChild(newBox);
        
            }
    
            board.appendChild(newRow);
        
        }
    
    }

}