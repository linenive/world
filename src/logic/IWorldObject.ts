import { IEyeSight } from "./IEyeSight";
import { Color, Quaternion, Vector3 } from "three";

export interface IWorldObject {
    getId(): number;
    getPosition(): Vector3;
    setPosition(position: Vector3): void;
    getDirection(): Quaternion;
    getSize(): Vector3;
    getForce(): Vector3;
    setForce(new_force: Vector3): void;
    getSight(): IEyeSight | null;
    getColor(): Color | null;
}