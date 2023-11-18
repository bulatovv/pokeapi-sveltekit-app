import type { FightInProgressDTO } from '../dto/fight-in-progress';


export class GetFightInProgressById {
    constructor(
        protected readonly _id: string
    ) {}


    async execute(fetch): Promise<FightInProgressDTO | null> {
        

        const request = await fetch(`/fight?id=${this._id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (request.status === 404) {
            return null;
        }

        return await request.json() as FightInProgressDTO;
    }
}
