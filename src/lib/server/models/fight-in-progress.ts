import type { FightRound } from './fight-round';
import type { Result } from './result';
import type { Pair } from './pair';
import { AppendOnlyList } from './append-only-list';
import { Stack } from './stack'
import { Dice } from './dice'



export type PlayerAlreadyRolledError = {
    tag: 'PlayerAlreadyRolledError',
}

export type FightAlreadyFinishedError = {
    tag: 'FightAlreadyFinishedError',
}

export type MoveNotProvidedError = {
    tag: 'MoveNotProvidedError',
}

/*
 * TODO: Encapslate all container operations (AppendOnlyList, Stack)
 */
export class FightInProgress {
 
    protected constructor(
        protected readonly _id: string,
        protected readonly _autoplay: Pair<boolean>,
        protected readonly _pokemons: Pair<number>,
        protected readonly _rounds: AppendOnlyList<FightRound | 'finished'>,
        protected readonly _rolls: Stack<Pair<number | null>>,
    ) {}

    static create(
        id: string,
        autoplay: Pair<boolean>,
        pokemons: Pair<number>,
        rounds: Array<FightRound | 'finished'>,
        rolls: Array<Pair<number | null>> = [],
    ): FightInProgress {
        const fight = new FightInProgress(
            id, 
            autoplay, 
            pokemons,
            new AppendOnlyList(rounds), 
            new Stack(rolls)
        );

        if (autoplay[0]) {
            fight.progress(0);
        }

        return fight;
    }

    get id(): string {
        return this._id;
    }

    progress(turn: 0 | 1, turnNumber: number | null = null)
        : Result<
            void | 'finished', 
            PlayerAlreadyRolledError | FightAlreadyFinishedError | MoveNotProvidedError
        > {

        const lastRound = this._rounds.last();

        if (lastRound === 'finished') {
            return { success: false, error: { tag: 'FightAlreadyFinishedError' } };
        }

        const lastRoll = this._rolls.pop() ?? [null, null];

        if (lastRoll[turn] !== null) {
            return { success: false, error: { tag: 'PlayerAlreadyRolledError' } };
        }


        if (!this._autoplay[turn] && turnNumber === null) {
            return { success: false, error: { tag: 'MoveNotProvidedError' } };
        }


        if (turnNumber === null) {
            const dice = Dice.createAndRoll(1, 6);
            turnNumber = dice.value;
        }
        
        lastRoll[turn] = turnNumber;
        this._rolls.push(lastRoll);


        if (lastRoll[0] !== null && lastRoll[1] !== null) {
            if (lastRoll[0] % 2 == lastRoll[1] % 2) {
                this._rounds.append(lastRound.complete(0));
            }
            else {
                this._rounds.append(lastRound.complete(1));
            }
        }


        if (this._rounds.last() === 'finished') {
            return { success: true, value: 'finished' };
        }
       


        const nextTurn = turn == 0 ? 1 : 0;

        if (this._autoplay[nextTurn]) {
            return this.progress(nextTurn);
        }

        return { success: true, value: undefined };

    }
    
    
}
