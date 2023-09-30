<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
    {#each data.pokemons as pokemon (pokemon.name)}
        <a href="pokemon/{pokemon.id}">
            <div class="pokemon">
                <!-- show spinner while loading image -->
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon.id}.png" alt="{pokemon.name}" />
                <h3>{pokemon.name}</h3>
            </div>
        </a>
    {/each}

</main>
