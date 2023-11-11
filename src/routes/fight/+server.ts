import { FightInProgressRepository } from '$lib/server/repositories/fight-in-progress-repository';
import type { RequestHandler } from './$types';

const repository = new FightInProgressRepository();

export const GET: RequestHandler = async () => {
    const fightId = 'current';
    const fight = await repository.get(fightId);
    
    return new Response(JSON.stringify(fight), {
        headers: {
            'content-type': 'application/json'
        }
    });

}
