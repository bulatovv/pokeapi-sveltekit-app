import { pokeapiGraphqlEndpoint } from '../config/services';
import { GetPokemonById } from './get-pokemon-by-id';
import type { PokemonWithStats } from '../dto/pokemon-with-stats';


export class GetRandomPokemon {
    async execute(): Promise<PokemonWithStats> {
        const request = await fetch(pokeapiGraphqlEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                query: `
                    query {
                        aggregate: pokemon_v2_pokemonspecies_aggregate {
                            aggregate {
                                count
                            }
                        }
                    }
                `
            })
        });

        type GraphqlResponse = {
            data: {
                aggregate: {
                    aggregate: {
                        count: number;
                    }
                }
            }
        }

        const max = (await request.json() as GraphqlResponse).data.aggregate.aggregate.count;

        const id = Math.floor(Math.random() * max) + 1;

        const getPokemonById = new GetPokemonById(id);

        return await getPokemonById.execute();
    }
}
