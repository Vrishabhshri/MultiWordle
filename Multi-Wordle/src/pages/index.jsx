import '../styles/index.css';
import '../styles/universal.css';

export default function Home() {

  return <div id="main">

    <div id="title-bar">

        <div id="title">

            Multi-Wrdle

        </div>

    </div>

    <div id="how-to-play-button">

        How to Play

    </div>

    <div className="instructions">

        The game is like world and other instructions will go here...

    </div>
    
    <button id="play-button">Play</button>

    <div id="enter-code">

        Or enter a code

    </div>

    <input id="enter-code-input" type="text"/>

    <a href="guesser-board.html">Guesser</a>
    <a href="chooser-board.html">Chooser</a>

  </div>

}