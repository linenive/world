import { ObjectDistanceSquared } from "./IGlobalWorld";
import { Vector3 } from "three";

export interface IEyeSight {
    getSightPosition(): Vector3;
    getSightLength(): number;
    /** degree 시야각을 얻습니다. */
    getHalfFovRadian(): number;
    getDirection(): Vector3;
    canSee(point: Vector3): boolean;
    getClosest3(): ObjectDistanceSquared[];
}