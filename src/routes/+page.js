/** @type {import('./$types').PageLoad} */
export async function load() {
    const chunkSize = 400;
    let endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${chunkSize}`;

    const pokemons = [];

    while (endpoint) {
        const response = await fetch(endpoint);
        const chunk = await response.json();

        for (const pokemon of chunk.results) {
            const id = pokemon.url.split('/').slice(-2)[0];
            pokemon.id = id;
        }

        pokemons.push(...chunk.results);

        endpoint = chunk.next;
    }

    return {
        pokemons: pokemons
    };
}
