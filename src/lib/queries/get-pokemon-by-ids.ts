import { pokeapiGraphqlEndpoint } from '../config/services';
import type { PokemonWithStats } from '../dto/pokemon-with-stats';

export class GetPokemonByIds {
    
    constructor(
        protected readonly id: number[]
    ) {};

    async execute(): Promise<PokemonWithStats[]> {
        const request = await fetch(pokeapiGraphqlEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                query: `
                    query($ids: [Int!]) {
                        pokemon: pokemon_v2_pokemon(where: {id: {_in: $ids}}) {
                            id,
                            name,
                            pokemon_v2_pokemonstats(where: {pokemon_v2_stat: {name: {_in: ["hp", "attack"]}}}) {
                                base_stat
                                pokemon_v2_stat {
                                    name
                                }
                            }
                        }
                    }
                `,
                variables: { ids: this.id }
            })
        });

        type GraphqlResponse = {
            data: {
                pokemon: {
                    id: number;
                    name: string;
                    pokemon_v2_pokemonstats: {
                        base_stat: number;
                        pokemon_v2_stat: {
                            name: string;
                        }
                    }[];
                }[];
            }
        };

        const response: GraphqlResponse = await request.json();

        const stats =  {hp: 0, attack: 0};

        return response.data.pokemon.map(pokemon => {
            pokemon.pokemon_v2_pokemonstats.forEach(stat => {
                if (stat.pokemon_v2_stat.name === 'hp') {
                    stats.hp = stat.base_stat;
                }
                if (stat.pokemon_v2_stat.name === 'attack') {
                    stats.attack = stat.base_stat;
                }
            });
            return {
                id: pokemon.id,
                name: pokemon.name,
                stats: stats,
            };
        });

    }
}
