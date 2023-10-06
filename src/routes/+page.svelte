<script>
    import { goto } from '$app/navigation';
    import debounce from 'lodash.debounce';
    import PokemonCard from '$lib/components/PokemonCard.svelte';

    /** @type {import('./$types').PageData} */
	export let data;
    

    let search = '';

    const handleSearch = ({ target : { value } }) => {
        search = value;
    }

    $: if (search) {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        
        goto(`/?${params.toString()}`, { keepFocus: true, noScroll: true });
    }

</script>

<main>
    <input 
        type="text"
        on:keyup={debounce(handleSearch, 500)}
        placeholder="Search..."
        class="rounded-lg bg-gray-100 p-4 m-4 shadow-md"/>

    <div class="grid grid-cols-3 gap-1">
        {#each data.pokemons as pokemon (pokemon.id)}
            <PokemonCard {pokemon} />
        {/each}
    </div>
</main>
