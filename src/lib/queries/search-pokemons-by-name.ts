import { pokeapiGraphqlEndpoint } from '../config/services';
import type { PokemonWithStats } from '../dto/pokemon-with-stats';


type PokemonsWithStatsPaginated = {
    pokemons: PokemonWithStats[];
    page: number;
    perPage: number;
    totalPages: number;
};

export class SearchPokemonsByName {
    constructor(
        protected readonly search: string,
        protected readonly page: number,
        protected readonly perPage: number,
    ) {}

    async execute(): Promise<PokemonsWithStatsPaginated> {

        const request = await fetch(pokeapiGraphqlEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                query: `
                    query($search: String!, $limit: Int!, $offset: Int!) {
                        species: pokemon_v2_pokemon(where: {name: {_ilike: $search}}, limit: $limit, offset: $offset) { 
                            id,
                            name,
                            pokemon_v2_pokemonstats(where: {pokemon_v2_stat: {name: {_in: ["hp", "attack"]}}}) {
                                base_stat
                                pokemon_v2_stat {
                                    name
                                }
                            }
                        }
                        aggregate: pokemon_v2_pokemonspecies_aggregate(where: {name: {_ilike: $search}}) {
                            aggregate {
                                count
                            }
                        }
                    }

                `,
                variables: { 
                    search: `${this.search}%`,
                    limit: this.perPage, 
                    offset: (this.page - 1) * this.perPage 
                },
            })
        });
        
        type GraphqlResponse = {
            data: {
                species: {
                    id: number;
                    name: string;
                    pokemon_v2_pokemonstats: {
                        base_stat: number;
                        pokemon_v2_stat: {
                            name: string;

                        }
                    }[];
                }[];
                aggregate: {
                    aggregate: {
                        count: number;   
                    }
                }
            }
        }



        const response: GraphqlResponse = await request.json();

        const pokemons = response.data.species.map((pokemon) => {
            const stats: {hp: number; attack: number} = {hp: 0, attack: 0};
            
            pokemon.pokemon_v2_pokemonstats.forEach((stat) => {
                if (stat.pokemon_v2_stat.name === 'hp') {
                    stats.hp = stat.base_stat;
                } else if (stat.pokemon_v2_stat.name === 'attack') {
                    stats.attack = stat.base_stat;
                }
            });

            return {
                id: pokemon.id,
                name: pokemon.name,
                stats,
            };
        });

        return {
            pokemons,
            page: this.page,
            perPage: this.perPage,
            totalPages: Math.ceil(response.data.aggregate.aggregate.count / this.perPage),
        };

    }
}

