export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static get Zero(): Vector2 {
        return new Vector2(0, 0);
    }
}