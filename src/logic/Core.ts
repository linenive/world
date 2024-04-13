export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export class Dictionary<TKey extends string | number, TValue> {
    private dict: Record<TKey, TValue>;

    constructor() {
        this.dict = {} as Record<TKey, TValue>;
    }

    public add(key: TKey, value: TValue): void {
        this.dict[key] = value;
    }

    public get(key: TKey): TValue | undefined {
        return this.dict[key];
    }

    public has(key: TKey): boolean {
        return this.dict.hasOwnProperty(key);
    }

    public getIterable(): Iterable<TValue> {
        return Object.values(this.dict);
    }
}