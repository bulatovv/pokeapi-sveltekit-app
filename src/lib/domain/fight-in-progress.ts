import type { FightRound } from './fight-round';
import type { Result } from './result';
import type  { AppendOnlyList } from './append-only-list';
import type { Stack } from './stack'
import { Dice } from './dice'

type Pair<T> = [T, T];


type PlayerAlreadyRolledError = {
    tag: 'PlayerAlreadyRolledError',
}

type FightAlreadyFinishedError = {
    tag: 'FightAlreadyFinishedError',
}

export class FightInProgress {
 
    protected constructor(
        protected readonly gameId: string,
        protected readonly autoplay: Pair<boolean>,
        protected readonly rounds: AppendOnlyList<FightRound | 'finished'>,
        protected readonly rolls: Stack<Pair<Dice | null>>,
    ) {}

    static create(
        gameId: string,
        autoplay: Pair<boolean>,
        rounds: AppendOnlyList<FightRound | 'finished'>,
        rolls: Stack<Pair<Dice | null>>,
    ): FightInProgress {
        const fight = new FightInProgress(gameId, autoplay, rounds, rolls);

        if (autoplay[0]) {
            fight.progress(0);
        }

        return fight;
    }


    progress(turn: 0 | 1)
        : Result<
            void | 'finished', 
            PlayerAlreadyRolledError | FightAlreadyFinishedError
        > {

        const lastRound = this.rounds.last();

        if (lastRound === 'finished') {
            return { success: false, error: { tag: 'FightAlreadyFinishedError' } };
        }


        const lastRoll = this.rolls.pop() ?? [null, null];

        if (lastRoll[turn] !== null) {
            return { success: false, error: { tag: 'PlayerAlreadyRolledError' } };
        }


        const dice = Dice.createAndRoll(1, 6);
        lastRoll[turn] = dice;
        this.rolls.push(lastRoll);


        if (lastRoll[0] && lastRoll[1]) {
            if (lastRoll[0].value % 2 == lastRoll[1].value % 2) {
                this.rounds.append(lastRound.complete(0));
            }
            else {
                this.rounds.append(lastRound.complete(1));
            }
        }


        if (this.rounds.last() === 'finished') {
            return { success: true, value: 'finished' };
        }
       


        const nextTurn = turn == 0 ? 1 : 0;

        if (this.autoplay[nextTurn]) {
            return this.progress(nextTurn);
        }

        return { success: true, value: undefined };

    }


}
