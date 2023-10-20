import type { Result } from './result';

export type NonPositiveMaxHpError = {
    tag: 'NonPositiveMaxHpError',
};

export type NegativeAttackError = {
    tag: 'NegativeAttackError',
};

export class Pokemon {
    constructor(
        protected _id: number,
    ) {}
}

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
        NonPositiveMaxHpError | NegativeAttackError
    > {
        if (maxHp <= 0) {
            return {
                success: false,
                error: { tag: 'NonPositiveMaxHpError' },
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

    takeDamage(damage: number): void {
        this._hp = Math.max(0, this._hp - damage);
    }

    get hp(): number {
        return this._hp;
    }

    defeated(): boolean {
        return this._hp === 0;
    }
}
