export default class Player {

    #score;

    constructor(score) {

        this.#score = 0;

    }

    addScore(points) {

        this.#score += points;

    }

}