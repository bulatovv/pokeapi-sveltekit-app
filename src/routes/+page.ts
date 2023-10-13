import { pokeapiGraphqlEndpoint } from '$lib/config/services';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const perPage = 12;

    const request = await fetch(pokeapiGraphqlEndpoint, {
        method: 'POST',
        body: JSON.stringify({
            query: `
                query($search: String!, $limit: Int!, $offset: Int!) {
                    species: pokemon_v2_pokemonspecies(where: {name: {_ilike: $search}}, limit: $limit, offset: $offset) { 
                        id,
                        name,
                    }
                    aggregate: pokemon_v2_pokemonspecies_aggregate(where: {name: {_ilike: $search}}) {
                        aggregate {
                            count
                        }
                    }
                }

            `,
            variables: { 
                search: `${search}%`,
                limit: perPage, 
                offset: (page - 1) * perPage 
            },
        })
    });

    const response = await request.json();

    return {
        search: search,
        page: page,
        pokemons: response.data.species,
        totalPages: Math.ceil(response.data.aggregate.aggregate.count / perPage),
    };
}
