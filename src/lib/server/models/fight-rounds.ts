import type { FightRound } from './fight-round';

export class FightRounds {
    constructor(
        protected readonly rounds: Array<FightRound>
    ) {}


    finished(): boolean {
        return this.rounds[this.rounds.length - 1].finished();
    }

    win(turn: 0 | 1): FightRounds {
        const lastRound = this.rounds[this.rounds.length - 1]
        return new FightRounds([...this.rounds, lastRound.win(turn)]);
    }

    winner(): 0 | 1 | null {
        return this.rounds[this.rounds.length - 1].winner();
    }

}
