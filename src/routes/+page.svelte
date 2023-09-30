<script>
    import debounce from 'lodash.debounce';

    import PokemonCard from '$lib/components/PokemonCard.svelte';

    /** @type {import('./$types').PageData} */
	export let data;
    
    let search = '';

    $: filtered = data.pokemons.filter(
        pokemon => pokemon.name.startsWith(search)
    );

    const handleSearch = ({target : {value}}) => {
        search = value;
    }
    

</script>

<main>
    <input 
        type="text"
        on:keyup={debounce(handleSearch, 500)}
        placeholder="Search..."
        class="rounded-lg bg-gray-100 p-4 m-4 shadow-md"/>

    <div class="grid grid-cols-3 gap-1">
        {#each filtered as pokemon (pokemon.name)}
            <PokemonCard {pokemon} />
        {/each}
    </div>



</main>
