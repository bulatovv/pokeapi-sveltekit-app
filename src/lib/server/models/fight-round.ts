import type { PokemonInFight } from './pokemon-in-fight';

export class FightRound {
    protected constructor(
        protected readonly pokemons: [PokemonInFight, PokemonInFight]
    ) {}


    static create(pokemons: [PokemonInFight, PokemonInFight]): FightRound {
        return new FightRound(pokemons);
    }


    complete(attacker: 0 | 1): 'finished' | FightRound {
        const defender = (attacker + 1) % 2;
    
        const attackerPokemon = this.pokemons[attacker];
        const defenderPokemon = this.pokemons[defender].takeDamage(attackerPokemon);

        if (defenderPokemon == 'defeated') {
            return 'finished';
        }

        return new FightRound([attackerPokemon, defenderPokemon]);
    }
}
