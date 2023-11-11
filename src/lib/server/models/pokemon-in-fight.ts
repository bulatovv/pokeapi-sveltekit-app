import type { Result } from './result';

export type NegativeMaxHpError = {
    tag: 'NegativeMaxHpError',
};

export type NegativeAttackError = {
    tag: 'NegativeAttackError',
};

export class PokemonInFight {
    constructor(
        protected _hp: number,
        protected _attack: number,
    ) {}

    static create(
        maxHp: number, 
        attack: number
    ): Result<
        PokemonInFight,
        NegativeMaxHpError | NegativeAttackError
    > {
        if (maxHp <= 0) {
            return {
                success: false,
                error: { tag: 'NegativeMaxHpError' },
            };
        }

        if (attack < 0) {
            return {
                success: false,
                error: { tag: 'NegativeAttackError' },
            };
        }

        return {
            success: true,
            value: new PokemonInFight(maxHp, attack),
        };

    }

    takeDamage(from: PokemonInFight): PokemonInFight {
        const hp = Math.max(0, this._hp - from.attack);

        return new PokemonInFight(hp, this._attack);
    }
   
    defeated(): boolean {
        return this._hp == 0;
    }

    get hp() {
        return this._hp;
    }

    get attack() {
        return this._attack;
    }
}
