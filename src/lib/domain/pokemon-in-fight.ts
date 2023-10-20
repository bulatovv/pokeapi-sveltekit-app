import type { Result } from './result';

export type NonPositiveMaxHpError = {
    tag: 'NonPositiveMaxHpError',
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

    attack(another: PokemonInFight): 'defeated' | PokemonInFight {
        return another.takeDamage(this.attack);
    }

    takeDamage(from: PokemonInFight): 'defeated' | PokemonInFight {
        if (this.hp <= from.attack) {
            return 'defeated'
        }

        return new PokemonInFight(this.hp - this.attack, this.attack);
    }
    
    get hp() {
        return _hp;
    }

    get attack() {
        return _attack;
    }
}
