import type { PageLoad } from './$types';
import type { PokemonWithStats } from '$lib/dto/pokemon-with-stats';
import { GetPokemonByName } from '$lib/queries/get-pokemon-by-name';
import { GetPokemonById } from '$lib/queries/get-pokemon-by-id';

export const load: PageLoad = async ({ params }) => {
    
    const isNumerical = /^\d+$/.test(params.key);

    const pokemon: PokemonWithStats = isNumerical 
        ? await new GetPokemonById(parseInt(params.key)).execute()
        : await new GetPokemonByName(params.key).execute()

    return {
        pokemon
    };
}
