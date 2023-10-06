import { pokeapiGraphqlEndpoint } from '$lib/config/services';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    const search = (url.searchParams.get('search') || '') + '%';

    let request;

    request = await fetch(pokeapiGraphqlEndpoint, {
        method: 'POST',
        body: JSON.stringify({
            query: `
                query($search: String!) {
                    species: pokemon_v2_pokemonspecies(where: {name: {_ilike: $search}}) { 
                        id,
                        name,
                    }
                }

            `,
            variables: { search },
        })
    });

    const response = await request.json();

    return {
        pokemons: response.data.species,
    };
}
