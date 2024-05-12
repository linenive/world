import { clamp } from './Core';

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

    static subtract(v1: Vector3, v2: Vector3): Vector3 {
        return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    static scale(v: Vector3, scalar: number): Vector3 {
        return new Vector3(v.x * scalar, v.y * scalar, v.z * scalar);
    }

    static dot(v1: Vector3, v2: Vector3): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    /** 정규화된 벡터를 사용한다고 가정 */
    static angleBetween(v1: Vector3, v2: Vector3): number {
        var dotProduct = v1.dot(v2)
        return Math.acos(clamp(dotProduct, -1, 1))
    }

    public add(v: Vector3): Vector3 {
        return Vector3.add(this, v);
    }

    public subtract(v: Vector3): Vector3 {
        return Vector3.subtract(this, v);
    }

    public scale(scalar: number): Vector3 {
        return Vector3.scale(this, scalar);
    }

    public dot(v: Vector3): number {
        return Vector3.dot(this, v);
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public squaredMagnitude(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public normalize(): Vector3 {
        const magnitude = this.magnitude();
        return new Vector3(this.x / magnitude, this.y / magnitude, this.z / magnitude);
    }

    public distanceSquared(v: Vector3): number {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }

    toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}

export function checkCollision(
    from: Vector3,
    to: Vector3,
    position: Vector3,
    size: Vector3
): boolean {
    const halfSize = size.scale(0.5);
    const min = position.subtract(halfSize);
    const max = position.add(halfSize);

    // Initial point containment check
    if (isPointInsideBox(from, min, max) || isPointInsideBox(to, min, max)) {
        return true;
    }

    const direction = to.subtract(from);

    // Avoid division by zero and check if the point is in range for the zero direction component
    if ((direction.x === 0 && (from.x < min.x || from.x > max.x)) ||
        (direction.y === 0 && (from.y < min.y || from.y > max.y)) ||
        (direction.z === 0 && (from.z < min.z || from.z > max.z))) {
        return false;
    }

    // Calculate intersection t values for each axis
    const tX1 = direction.x !== 0 ? (min.x - from.x) / direction.x : Number.POSITIVE_INFINITY;
    const tX2 = direction.x !== 0 ? (max.x - from.x) / direction.x : Number.POSITIVE_INFINITY;
    const tY1 = direction.y !== 0 ? (min.y - from.y) / direction.y : Number.POSITIVE_INFINITY;
    const tY2 = direction.y !== 0 ? (max.y - from.y) / direction.y : Number.POSITIVE_INFINITY;
    const tZ1 = direction.z !== 0 ? (min.z - from.z) / direction.z : Number.POSITIVE_INFINITY;
    const tZ2 = direction.z !== 0 ? (max.z - from.z) / direction.z : Number.POSITIVE_INFINITY;

    // Calculate the maximum and minimum t values across all three axes
    const tMin = Math.max(Math.min(tX1, tX2), Math.min(tY1, tY2), Math.min(tZ1, tZ2));
    const tMax = Math.min(Math.max(tX1, tX2), Math.max(tY1, tY2), Math.max(tZ1, tZ2));

    // Check if there exists a valid intersection interval
    return tMax >= 0 && tMin <= tMax && tMin <= 1 && tMax >= 0;
}

function isPointInsideBox(point: Vector3, min: Vector3, max: Vector3): boolean {
    return point.x >= min.x && point.x <= max.x &&
        point.y >= min.y && point.y <= max.y &&
        point.z >= min.z && point.z <= max.z;
}
