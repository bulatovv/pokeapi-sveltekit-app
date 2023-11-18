import type { Actions } from './$types';
import { FightService } from '$lib/server/services/fight-service';
import { FightInProgressRepository } from '$lib/server/repositories/fight-in-progress-repository';
import { GetRandomPokemon } from '$lib/queries/get-random-pokemon';
import type { PokemonWithStats } from '$lib/dto/pokemon-with-stats';

import { redirect } from '@sveltejs/kit';

const fightInProgressRepository = new FightInProgressRepository();
const fightInProgressService = new FightService(fightInProgressRepository);


export const actions = {
	default: async ({ request, fetch }) => {
        const data = await request.formData();
        const firstPokemon = parseInt(data.get('pokemon') as string);

        const secondPokemon = (
            await (new GetRandomPokemon()).execute() as PokemonWithStats
        ).id;
        
        await fightInProgressService.start([firstPokemon, secondPokemon], [false, true]);

        throw redirect(303, '/fight');

    },
} satisfies Actions;
