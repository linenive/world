import { Vector3 } from "./Vector3";
import { ForceVector } from "./PhysicsModel";
import { IEyeSight } from "./IEyeSight";
import { Color } from "three";

export interface IWorldObject {
    getId(): number;
    getPosition(): Vector3;
    setPosition(position: Vector3): void;
    getSize(): Vector3;
    getForce(): ForceVector;
    getSight(): IEyeSight | null;
    getColor(): Color | null;
}