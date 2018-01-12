/**
 * Created by nanhuijuan on 2017/2/3.
 */
/* eslint-disable */
export default class DurationManager {
    constructor() {
        this._begin = 0;
        this._cardId = null;
        this._duration = 0;
    }

    begin(cardId) {
        this._begin = new Date().getTime();
        this._cardId = cardId;
        this._duration = 0;
    }

    pause() {
        if (this._cardId && this._begin > 0) {
            const end = new Date().getTime();
            this._duration += (end - this._begin);
            this._begin = 0;
        }
    }

    resume() {
        this._begin = new Date().getTime();
    }

    getDuration() {
        if (this._cardId === null) {
            return null;
        }

        const end = new Date().getTime();

        return {
            cardId: this._cardId,
            duration: end - this._begin + this._duration,
        };
    }

    isActive() {
        return this._cardId && this._begin > 0;
    }
}
