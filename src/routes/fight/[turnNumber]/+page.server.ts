import type { Actions } from './$types';
import { FightService } from '$lib/server/services/fight-service';
import { FightInProgressRepository } from '$lib/server/repositories/fight-in-progress-repository';

const fightInProgressRepository = new FightInProgressRepository();
const fightInProgressService = new FightService(fightInProgressRepository);


export const actions = {
	default: async ({ params }) => {
        const turnNum = parseInt(params.turnNumber);

        await fightInProgressService.progress('current', 0, turnNum);
	},
} satisfies Actions;
