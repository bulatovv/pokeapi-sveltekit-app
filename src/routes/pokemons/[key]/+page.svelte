<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    // show pokemon info: name, stats.hp, stats.attack

</script>

<main class="flex flex-col items-center">
    <!-- image on left, text on right -->

    <div class="flex flex-row items-center justify-start w-2/3 p-4 m-4 bg-gray-100 rounded-lg shadow-md">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{data.pokemon.id}.png" 
             alt="{data.pokemon.name}" 
             class="w-96 h-96" />

        <div class="flex flex-col items-start">
            <h1 class="text-2xl font-bold">{data.pokemon.name}</h1>
            <p class="text-lg font-semibold">HP: {data.pokemon.stats.hp}</p>
            <p class="text-lg font-semibold">Attack: {data.pokemon.stats.attack}</p>
        </div>
    </div>
    
    <div class="flex flex-row items-center justify-around w-2/3 p-4 m-4">
        <a href="/" class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            &larr; Back
        </a>

        <a class="ml-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Fight
        </a>
    <div>


</main>
