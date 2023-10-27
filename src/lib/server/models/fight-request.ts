import type { Result } from './result'; 

export type FightRequestAlreadyAccepted = {
    tag: 'FightRequestAlreadyAccepted',
}

export class FightRequest {
    constructor(
        protected readonly _id: string,
        protected readonly _attacker: number,
        protected readonly _attackerPokemon: number,
        protected readonly _defender: number, 
        protected _accepted: boolean
    ) {}

    static create(
        id: string,
        attacker: number,
        attackerPokemon: number,
        defender: number,
        accepted: boolean = false,
    ): FightRequest {
        return new FightRequest(
            id,
            attacker,
            attackerPokemon,
            defender,
            accepted    
        );
    }

    accept(): Result<void, FightRequestAlreadyAccepted> {
        if (this._accepted) {
            return {
                success: false,
                error: {tag: 'FightRequestAlreadyAccepted'},
            }
        }

        this._accepted = true;

        return {
            success: true,
            value: undefined,
        };
    }

    get id(): string {
        return this._id;
    }
}
