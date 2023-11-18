import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { GetFightInProgressById } from '$lib/queries/get-fight-in-progress-by-id';
import type { FightInProgressDTO } from '$lib/dto/fight-in-progress';

export const load: PageLoad = async ({ fetch }) => {
    const fight: FightInProgressDTO | null = await (new GetFightInProgressById('current')).execute(fetch);
    
    if (!fight) {
        throw error(404, 'Fight not found');
    }

    return { fight };
}
