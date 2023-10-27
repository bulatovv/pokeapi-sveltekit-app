import type { PageLoad } from './$types';
import type { PokemonWithStats } from '$lib/dto/pokemon-with-stats';
import { GetPokemonByName } from '$lib/queries/get-pokemon-by-name';

export const load: PageLoad = async ({ params }) => {

    const pokemon: PokemonWithStats = await new GetPokemonByName(params.pokemon).execute();

    return {
        pokemon
    };
}
