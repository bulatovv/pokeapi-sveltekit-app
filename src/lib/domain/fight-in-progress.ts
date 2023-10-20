import type { Result } from './result'; 
import { PokemonInFight } from './pokemon';


export type FightAlreadyFinishedError = {
    tag: 'FightAlreadyFinishedError',
};


export class FightInProgress {
    protected constructor(
        protected readonly pokemons: PokemonInFight[2],
        readonly finished: boolean = false,
    ) {}


    static create(pokemons: PokemonInFight[2], finished: boolean): FightInProgress {
        return new FightInProgress(pokemons, finished);
    }


    attack(attacker: 0 | 1): Result<{ finished: boolean }, FightWrongTurnError> {
        if (this._finished) {
            return {
                success: false,
                tag: 'FightAlreadyFinishedError',
            }
        }

        const defender = (attacker + 1) % 2;
    
        this.pokemons[attacker].attack(this.pokemons[defender])

        if (this.pokemons[defendeer].defeated()) {
            this._finished = true;
        }

        return { success: true };
    }
}
