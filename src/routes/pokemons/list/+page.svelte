<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import debounce from 'lodash.debounce';
    import PokemonCard from '$lib/components/PokemonCard.svelte';
    import Pagination from '$lib/components/pagination/Pagination.svelte';

	export let data: PageData;

    const handleSearch = (e: KeyboardEvent) => {
        data.search = (e.target as HTMLInputElement).value;
    }

    $: if (browser && (data.search || data.page)) {
        const params = new URLSearchParams();
        if (data.search) params.set('search', data.search);
        if (data.page != 1) params.set('page', data.page.toString());
        
        goto(`?${params.toString()}`, { keepFocus: true, noScroll: true });
    }

</script>

<main>
    <input 
        type="text"
        on:keyup={debounce(handleSearch, 500)}
        placeholder="Search..."
        class="rounded-lg bg-gray-100 p-4 m-4 shadow-md"
        value={data.search}
        />

    <div class="grid grid-cols-3 gap-1">
        {#each data.pokemons as pokemon (pokemon.id)}
            <PokemonCard {pokemon} />
        {/each}
    </div>


    <Pagination totalPages={data.totalPages} bind:page={data.page} class="color-red-500" />

</main>
