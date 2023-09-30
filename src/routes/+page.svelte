<script>
	/** @type {import('./$types').PageData} */
	export let data;
    
    let search = '';

    $: filtered = data.pokemons.filter(
        pokemon => pokemon.name.startsWith(search)
    );

</script>

<main>
    <input type="text" bind:value={search} placeholder="Search..." class="rounded-lg bg-gray-100 p-4 m-4" />


    {#each filtered as pokemon (pokemon.name)}
        <div class="rounded-lg bg-gray-100 p-4 m-4 flex flex-col items-start">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon.id}.png" alt="[{pokemon.name}]" />
            <h3>{pokemon.name}</h3>
     </div>
    {/each}

</main>
