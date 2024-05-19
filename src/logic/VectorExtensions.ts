import { Vector3 } from "three";

export class ExtendedVector3 extends Vector3 {
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

    static get Backward(): Vector3 {
        return new Vector3(0, 0, -1);
    }

    static get Down(): Vector3 {
        return new Vector3(0, -1, 0);
    }

    static get Left(): Vector3 {
        return new Vector3(-1, 0, 0);
    }
}

export function checkCollision(
    from: Vector3,
    to: Vector3,
    position: Vector3,
    size: Vector3
): boolean {
    const halfSize = size.multiplyScalar(0.5);
    const min = position.sub(halfSize);
    const max = position.add(halfSize);

    // Initial point containment check
    if (isPointInsideBox(from, min, max) || isPointInsideBox(to, min, max)) {
        return true;
    }

    const direction = to.sub(from);

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
