<script lang="ts">
    import type { PokemonWithStats } from '$lib/dto/pokemon-with-stats';


    export let pokemon: PokemonWithStats;
</script>


<div class="rounded-lg bg-gray-100 p-4 m-4 flex flex-col items-start shadow-md">
    <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{pokemon.id}.png" alt="[{pokemon.name}]" 
        class="w-72 h-72"
    />

    <div class="flex flex-col items-start">
        <h2 class="text-2xl font-bold">{pokemon.name}</h2>

        <div class="flex flex-row items-center">
            <div class="flex flex-col items-start">
                <p class="text-lg font-semibold">HP</p>
                <p class="text-lg font-semibold">Attack</p>
            </div>

            <div class="flex flex-col items-start ml-4">
                <p class="text-lg font-semibold">{pokemon.stats.hp}</p>
                <p class="text-lg font-semibold">{pokemon.stats.attack}</p>
            </div>
        </div>
    
    </div>

</div>
