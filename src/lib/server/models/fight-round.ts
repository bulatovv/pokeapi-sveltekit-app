import type { PokemonInFight } from './pokemon-in-fight';

export class FightRound {
    protected constructor(
        protected readonly pokemons: [PokemonInFight, PokemonInFight]
    ) {}


    static create(pokemons: [PokemonInFight, PokemonInFight]): FightRound {
        return new FightRound(pokemons);
    }


    win(attacker: 0 | 1): FightRound {
        const defender = (attacker + 1) % 2;
   
        const attackerPokemon = this.pokemons[attacker];
        const defenderPokemon = this.pokemons[defender].takeDamage(attackerPokemon);

        return new FightRound([attackerPokemon, defenderPokemon]);
    }

    finished(): boolean {
        return this.pokemons[0].defeated() || this.pokemons[1].defeated();
    }

    winner(): 0 | 1 | null {
        if (this.pokemons[0].defeated()) {
            return 1;
        }

        if (this.pokemons[1].defeated()) {
            return 0;
        }

        return null;
    }
}
