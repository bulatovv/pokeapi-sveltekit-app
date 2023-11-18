<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="flex flex-row items-center justify-start bg-gray-100 rounded-lg shadow-md mb-5">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{data.pokemon.id}.png" 
         alt="{data.pokemon.name}" 
         class="w-96 h-96" />

    <div class="flex flex-col items-start">
        <h1 class="text-2xl font-bold capitalize">{data.pokemon.name}</h1>
        <p class="text-lg font-semibold">HP: {data.pokemon.stats.hp}</p>
        <p class="text-lg font-semibold">Attack: {data.pokemon.stats.attack}</p>
    </div>
</div>
    
<div class="flex flex-row">
    <a href="/" class="ml-4 mr-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        &larr; Back
    </a>

    <div class="flex flex-row items-center justify-end text-lg font-semibold">
        Pick this pokemon for:
    </div>

    <form method="POST" action="/fight/fast" class="ml-4">
        <input type="hidden" name="pokemon" value="{data.pokemon.id}" />
        <button type="submit" class="ml-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Quick fight ⏳
        </button>
    </form>

    <form method="POST" action="/fight" class="ml-4">
        <input type="hidden" name="pokemon" value="{data.pokemon.id}" />
        <button type="submit" class="ml-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Fight ⚔️
        </button>
    </form>
</div>
