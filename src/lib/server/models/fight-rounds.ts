import type { FightRound } from './fight-round';

export class FightRounds {
    constructor(
        protected readonly _rounds: Array<FightRound>
    ) {}


    finished(): boolean {
        return this._rounds[this._rounds.length - 1].finished();
    }

    win(turn: 0 | 1): FightRounds {
        const lastRound = this._rounds[this._rounds.length - 1]
        return new FightRounds([...this._rounds, lastRound.win(turn)]);
    }

    winner(): 0 | 1 | null {
        return this._rounds[this._rounds.length - 1].winner();
    }

    get values(): Array<FightRound> {
        return this._rounds;
    }
}
