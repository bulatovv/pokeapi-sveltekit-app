import type { FightRound } from './fight-round';
import { FightRounds } from './fight-rounds';
import { FightMoves } from './fight-moves';
import type { Result } from './result';
import type { Pair } from './pair';



export type PlayerAlreadyRolledError = {
    tag: 'PlayerAlreadyRolledError',
}

export type MoveNotProvidedError = {
    tag: 'MoveNotProvidedError',
}

export class FightInProgress {
 
    protected constructor(
        protected readonly _id: string,
        protected readonly _autoplay: Pair<boolean>,
        protected readonly _pokemons: Pair<number>,
        protected _rounds: FightRounds,
        protected _moves: FightMoves,
    ) {}

    static create(
        id: string,
        autoplay: Pair<boolean>,
        pokemons: Pair<number>,
        rounds: Array<FightRound>,
        moves: Array<Pair<number | null>> = [],
    ): FightInProgress {
        const fight = new FightInProgress(
            id, 
            autoplay, 
            pokemons,
            new FightRounds(rounds), 
            new FightMoves(moves)
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
            void,
            PlayerAlreadyRolledError | MoveNotProvidedError 
        > {


        if (!this._autoplay[turn] && turnNumber === null) {
            return { success: false, error: { tag: 'MoveNotProvidedError' } };
        }

        
        if (this._rounds.finished()) {
            return { success: true, value: undefined };
        }

        const newMoves = this._moves.move(turn, turnNumber);
        if (!newMoves.success) {
            return newMoves;
        }
        this._moves = newMoves.value;

        const winnedMove = this._moves.winner();
        if (winnedMove !== null) {
            this._rounds = this._rounds.win(winnedMove);
        }

        const nextTurn = turn == 0 ? 1 : 0;
        if (this._autoplay[nextTurn]) {
            return this.progress(nextTurn);
        }

        return { success: true, value: undefined };
    }
    
    finished(): boolean {
        return this._rounds.finished();
    }
    
}
