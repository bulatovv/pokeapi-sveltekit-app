<script>
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import debounce from 'lodash.debounce';
    import PokemonCard from '$lib/components/PokemonCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    /** @type {import('./$types').PageData} */
	export let data;
    

    let page = data.page;
    let search = data.search;

    const handleSearch = ({ target : { value } }) => {
        search = value;
    }

    $: if (browser && (search || page)) {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (page != 1) params.set('page', page);
        
        goto(`/?${params.toString()}`, { keepFocus: true, noScroll: true });
    }

</script>

<main>
    <input 
        type="text"
        on:keyup={debounce(handleSearch, 500)}
        placeholder="Search..."
        class="rounded-lg bg-gray-100 p-4 m-4 shadow-md"
        value={search}
        />

    <div class="grid grid-cols-3 gap-1">
        {#each data.pokemons as pokemon (pokemon.id)}
            <PokemonCard {pokemon} />
        {/each}
    </div>

    <Pagination totalPages={data.totalPages} bind:page={page}/>

</main>
