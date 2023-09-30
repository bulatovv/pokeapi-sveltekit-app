<script>
    export let pokemon;
</script>


<div class="rounded-lg bg-gray-100 p-4 m-4 flex flex-col items-start shadow-md">
    <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{pokemon.id}.png" alt="[{pokemon.name}]" 
        class="w-72 h-72"
    />
    <h3>{pokemon.name}</h3>
</div>
