export class AppendOnlyList<T> {
    readonly _values : T[];

    constructor(
        values: T[] = [],
    ) {
        this._values = [...values];
    }

    get values(): ReadonlyArray<T> {
        return this._values;
    }

    append(value: T): void {
        this._values.push(value);
    }

    last(): T {
        return this._values[this._values.length - 1];
    }
}
