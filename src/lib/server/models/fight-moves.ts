import type { Pair } from './pair';
import type { Result } from './result';
import { Dice } from './dice'

export type PlayerAlreadyRolledError = {
    tag: 'PlayerAlreadyRolledError',
}

export type MoveNotProvidedError = {
    tag: 'MoveNotProvidedError',
}



export class FightMoves {
    protected moves: Array<Pair<number | null>>;
    protected dice: Dice;

    constructor(
        moves: Array<Pair<number | null>>,
    ) {
        this.moves = moves.length == 0 ? [[null, null]] : moves;
        this.dice = Dice.createAndRoll(1, 6);
    }

    
    move(
        turn: 0 | 1, 
        turnNumber: number | null
    ) : Result<
        FightMoves,
        PlayerAlreadyRolledError | MoveNotProvidedError
    > {

        let lastMove = this.moves.slice(-1)[0];
        let previous = this.moves.slice(0, -1);
        if (lastMove[0] !== null && lastMove[1] !== null) {
            lastMove = [null, null];
            previous = this.moves.slice();
        }


        if (lastMove[turn] !== null) {
            return { success: false, error: { tag: 'PlayerAlreadyRolledError' } };
        }


        if (turnNumber === null) {
            this.dice = this.dice.roll();
            turnNumber = this.dice.value;
        }
         
        lastMove[turn] = turnNumber;

        return {
            success: true,
            value: new FightMoves([
                ...previous,
                lastMove,
            ])
        };
    }

    winner(): 0 | 1 | null {
        let lastMove = this.moves.slice(-1)[0];
        
        if (lastMove[0] === null || lastMove[1] === null) {
            return null;
        }

        if (lastMove[0] % 2 == lastMove[1] % 2) {
            return 0;
        }
        else {
            return 1;
        }
    }

}
