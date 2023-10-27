export class Stack<T> {
    readonly _values: T[];

    constructor(
        values: T[] = [],
    ) {
        this._values = [...values];
    }

    get values(): ReadonlyArray<T> {
        return this._values;
    }

    push(value: T): void {
        this._values.push(value);
    }

    pop(): T | undefined {
        return this._values.pop();
    }
}

