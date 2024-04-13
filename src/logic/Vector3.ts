
export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get Zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }
    
    static get Forward(): Vector3 {
        return new Vector3(0, 0, 1);
    }

    static get Up(): Vector3 {
        return new Vector3(0, 1, 0);
    }

    static get Right(): Vector3 {
        return new Vector3(1, 0, 0);
    }

    static add(v1: Vector3, v2: Vector3): Vector3 {
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}