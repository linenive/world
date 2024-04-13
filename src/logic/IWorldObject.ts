import { Vector3 } from "./Core";

export interface IWorldObject {
    getId(): number;
    getPosition(): Vector3;
}