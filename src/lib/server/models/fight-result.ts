export class FightResult {
    constructor(
        protected readonly _winner: number,
    ) {}

    static create(
        winner: number,
    ): FightResult {
        return new FightFinished(
            winner,
        );
    }

    get winner(): number {
        return this._winner;
    }
}
