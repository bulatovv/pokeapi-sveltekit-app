import { pokeapiGraphqlEndpoint } from '../config/services';
import type { PokemonWithStats } from '../dto/pokemon-with-stats';


export class GetPokemonById {
    constructor(
        protected readonly id: number
    ) {};

    async execute(): Promise<PokemonWithStats> {
        const request = await fetch(pokeapiGraphqlEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                query: `
                    query($name: String!) {
                        pokemon: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
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
                variables: { id: this.id }
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

        response.data.pokemon[0].pokemon_v2_pokemonstats.forEach(stat => {
            if (stat.pokemon_v2_stat.name === 'hp') {
                stats.hp = stat.base_stat;
            }
            if (stat.pokemon_v2_stat.name === 'attack') {
                stats.attack = stat.base_stat;
            }
        });
        
        return {
            id: response.data.pokemon[0].id,
            name: response.data.pokemon[0].name,
            stats: stats
        };
    }
}
 
