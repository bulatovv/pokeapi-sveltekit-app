import { PokemonInFight } from './pokemon';
import type { Result } from './result'; 


export type FightRequestAlreadyAccepted = {
    tag: 'FightRequestAlreadyAccepted',
}

export type FightWrongTurnError = {
    tag: 'FightWrongTurnError',
};

export type FightAlreadyFinishedError = {
    tag: 'FightAlreadyFinishedError',
};


export class FightRequest {
    constructor(
        protected readonly attacker: number,
        protected readonly attackerPokemon: number,
        protected readonly defender: number, 
        protected readonly accepted: boolean
    ) {}

    static create(
        attacker: number,
        attackerPokemon: number,
        defender: number,
        accepted: boolean,
    ): FightRequest {
        return new FightRequest(
            attacker,
            attackerPokemon,
            defender,
            accepted    
        );
    }

    accept(withPokemon: number): Result<FightInProgress, FightRequestAlreadyAccepted> {
        if (this.accepted) {
            return {
                success: false,
                tag: 'FightRequestAlreadyAccepted',
            }
        }


        this.accepted = true;
        return FightInProgress.create(
            [this.attacker, this.defender],
            [this.attackerPokemon, withPokemon],
        );
    }
}


export class FightInProgress {
     
    protected readonly _players: number[2];
    protected readonly _playerPokemons: Record<number, PokemonInFight>;
    protected readonly _finished: boolean;

    constructor(
        players: number[2],
        playerPokemons: number[2],
        finished: boolean,
    ) {
        this._players = players;
        this._playerPokemons = { [players[0]]: playerPokemons[0], [players[1]]: playerPokemons[1] };
        this._finished = finished;
    }

    static create(
        players: number[2],
        playerPokemons: number[2],
        finished: boolean,
    ): Result<FightInProgress, WrongTurnError> {
        

        return new FightInProgress(
            players,
            playerPokemons,
            finished,
        );
    }

    attack(attacker: number)
        : Result<
            { finished: false } | { finished: true, result: FightResult },
            FightWrongTurnError
        > {
        if (! attacker in players) {
            return {
                success: false,
                tag: 'FightWrongTurnError'
            }
        }
        
        if (this._finished) {
            return {
                success: false,
                tag: 'FightAlreadyFinishedError',
            }
        }


        const attackerPokemon = this.attackerPokemon(attacker);
        const defenderPokemon = this.defenderPokemon(attacker);

        attackerPokemon.attack(defenderPokemon);

        if (defenderPokemon.defeated()) {
            this._finished = true;
            return {
                success: true,
                value: {
                    finished: true,
                    result: FightResult.create(attacker),
                }
            };
        }

        return { success: true, value: { finished: false } };
    }



    protected attackerPokemon(attacker: number): PokemonInFight {
        return this._playerPokemons[attacker];
    }

    protected defenderPokemon(attacker: number): PokemonInFight {
        return this._playerPokemons[this._players.filter(player => player !== attacker)[0]];
    }


}

export class FightResult {
    constructor(
        protected readonly _winner: number,
    ) {}

    static create(
        winner: number,
    ): FightResult {
        return new FightFinished(
            winner,
        );
    }

    get winner(): number {
        return this._winner;
    }
}
