import { Vector3 } from "./Vector3";
import { ForceVector } from "./PhysicsModel";

export interface IWorldObject {
    getId(): number;
    getPosition(): Vector3;
    setPosition(position: Vector3): void;
    getForce(): ForceVector;
}