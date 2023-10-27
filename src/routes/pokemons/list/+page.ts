import type { PageLoad } from './$types';
import { SearchPokemonsByName } from '$lib/queries/search-pokemons-by-name';


export const load: PageLoad = async ({ url }) => {
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const perPage = 12;
 
    const { pokemons, totalPages } = await new SearchPokemonsByName(search, page, perPage).execute();

    return { search, page, pokemons, totalPages };

}
