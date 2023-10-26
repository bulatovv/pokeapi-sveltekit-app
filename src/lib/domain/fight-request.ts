import type { Result } from './result'; 

export type FightRequestAlreadyAccepted = {
    tag: 'FightRequestAlreadyAccepted',
}

export class FightRequest {
    constructor(
        protected readonly attacker: number,
        protected readonly attackerPokemon: number,
        protected readonly defender: number, 
        protected readonly accepted: boolean
    ) {}

    static create(
        attacker: number,
        attackerPokemon: number,
        defender: number,
        accepted: boolean = false,
    ): FightRequest {
        return new FightRequest(
            attacker,
            attackerPokemon,
            defender,
            accepted    
        );
    }

    accept(): Result<void, FightRequestAlreadyAccepted> {
        if (this.accepted) {
            return {
                success: false,
                tag: 'FightRequestAlreadyAccepted',
            }
        }

        this.accepted = true;
    }
}
