export default class Player {

    #score;

    constructor() {

        this.#score = 0;

    }

    addScore(points) {

        this.#score += points;

    }

}