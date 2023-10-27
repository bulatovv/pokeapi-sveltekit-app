export class Dice {
    protected readonly _value: number;
    protected readonly _minValue: number;
    protected readonly _maxValue: number;


    constructor(
        minValue: number,
        maxValue: number,
        value: number,
    ) {
        this._minValue = minValue;
        this._maxValue = maxValue;
        this._value = value;
    }


    static createAndRoll(
        minValue: number,
        maxValue: number,
    ): Dice {
        const dice = new Dice(minValue, maxValue, Dice.getRoll(minValue, maxValue));
        return dice;
    }

    roll() : Dice {
        return new Dice(this._minValue, this._maxValue, Dice.getRoll(this._minValue, this._maxValue));
    }

    get value(): number {
        return this._value;
    }

    protected static getRoll(minValue: number, maxValue: number): number {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }
}
