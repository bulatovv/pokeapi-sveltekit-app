<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    let userMove: number;
    $: lastMove = data.fight.move[0];

    $: opponentMove = data.fight.move[1];
    $: winner = data.fight.winner;
    
</script>
<div class="flex flex-row items-around justify-around bg-gray-100 rounded-lg shadow-md p-4">
    <div>
        <div class="
                flex flex-row justify-center items-center
                text-white font-bold
                bg-indigo-500 rounded-lg shadow-md
                text-4xl w-32
                p-4
            ">
            Вы
            {#if winner === 0}
                <span>🏆</span>
            {:else if winner === 1}
                <span>👎</span>
            {/if}
        </div>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{data.fight.pokemons[0].id}.png" 
             alt="{data.fight.pokemons[0].name}" 
             class="w-96 h-96" />

        <div class="flex flex-col items-start mb-4">
            <h1 class="text-2xl font-bold capitalize">{data.fight.pokemons[0].name}</h1>
            <p class="text-lg font-semibold">HP: {data.fight.pokemons[0].currentHp}</p>
            <p class="text-lg font-semibold">Attack: {data.fight.pokemons[0].attack}</p>
        </div>

        {#if winner === null}
            <input 
                type="number"
                min="1"
                max="6"
                placeholder={lastMove ? lastMove.toString() : "Число от 1 до 6"}
                class="rounded-lg bg-gray-100 py-2 px-4 shadow-md mb-4 text-lg"
                bind:value={userMove}
            />
            <form action="/fight/{userMove}" method="POST">
                <input type="hidden" name="fightId" value="{data.fight.id}" />
                <button 
                    type="submit" 
                    class="
                        bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400
                        text-white font-bold 
                        py-2 px-4 rounded-lg"
                    disabled={userMove == undefined}>
                    Атаковать
                </button>
            </form>
        {:else}
            <a href="/pokemons/list" class="
                bg-green-500 hover:bg-blue-700
                text-white font-bold text-lg
                py-2 px-4 rounded-lg
            ">
                Вернуться &#8592;
            </a>
        {/if}

    </div>

    <div>
        <div class="
                flex flex-row justify-center items-center
                text-white font-bold
                bg-indigo-500 rounded-lg shadow-md
                text-4xl w-64
                p-4
            ">
            Противник
            {#if winner === 1}
                <span>🏆</span>
            {:else if winner === 0}
                <span>👎</span>
            {/if}
        </div>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{data.fight.pokemons[1].id}.png" 
             alt="{data.fight.pokemons[1].name}" 
             class="w-96 h-96" />
        
        <div class="flex flex-col items-start mb-4">
            <h1 class="text-2xl font-bold capitalize">{data.fight.pokemons[1].name}</h1>
            <p class="text-lg font-semibold">HP: {data.fight.pokemons[1].currentHp}</p>
            <p class="text-lg font-semibold">Attack: {data.fight.pokemons[1].attack}</p>
        </div>

        <div class="
                flex flex-row justify-center items-center
                background-gray-100 rounded-lg shadow-md 
                text-4xl w-16
                p-4
            ">
            {#if opponentMove == 1}
                <span>⚀</span>
            {:else if opponentMove == 2}
                <span>⚁</span>
            {:else if opponentMove == 3}
                <span>⚂</span>
            {:else if opponentMove == 4}
                <span>⚃</span>
            {:else if opponentMove == 5}
                <span>⚄</span>
            {:else if opponentMove == 6}
                <span>⚅</span>
            {:else}
                <span>?</span>
            {/if}
        </div>


    </div>


</div>


