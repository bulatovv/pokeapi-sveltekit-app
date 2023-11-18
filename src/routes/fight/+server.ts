import { FightInProgressRepository } from '$lib/server/repositories/fight-in-progress-repository';
import { GetPokemonByIds } from '$lib/queries/get-pokemon-by-ids';
import type { FightInProgress } from '$lib/server/models/fight-in-progress';
import type { FightInProgressDTO } from '$lib/dto/fight-in-progress';
import type { PokemonWithStats } from '$lib/dto/pokemon-with-stats';
import type { RequestHandler } from './$types';


const repository = new FightInProgressRepository();

export const GET: RequestHandler = async ({ url }) => {
    const data = await url.searchParams
    const fightId = data.get('id') as string;
    const fight: FightInProgress | null = await repository.get(fightId);

    if (!fight) {
        return new Response('Fight not found', { status: 404 });
    }

    const pokemonStats: PokemonWithStats[] = await (new GetPokemonByIds(fight.pokemons)).execute();
    const pokemonsState = fight.rounds.values.slice(-1)[0].pokemons;
    const lastMove = fight.moves.values.slice(-1)[0];

    const response: FightInProgressDTO = { 
        id: fight.id,
        pokemons: [
            {
                id: fight.pokemons[0],
                name: pokemonStats[0].name,
                attack: pokemonStats[0].stats.attack,
                currentHp: pokemonsState[0].hp,
            },
            {
                id: fight.pokemons[1],
                name: pokemonStats[1].name,
                attack: pokemonStats[1].stats.attack,
                currentHp: pokemonsState[1].hp,
            }
        ],
        move: lastMove,
        winner: fight.winner,
    };


    return new Response(
        JSON.stringify(response),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

}
