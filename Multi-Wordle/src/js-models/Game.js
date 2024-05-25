export default class Game {

    #players;
    #currentChooser;

    constructor(id) {

        this.#players = [];
        this.#currentChooser = null;
        this._id = id;

    }

    changeChooser(playerID) {

        this.#currentChooser = playerID;

    }

    addPlayer(playerID) {

        this.#players.push(playerID);

    }

}