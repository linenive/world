import { Vector3 } from "./Vector3";

export interface IEyeSight {
    getSightPosition(): Vector3;
    getSightLength(): number;
    getFov(): number;
    canSee(point: Vector3): boolean;
}