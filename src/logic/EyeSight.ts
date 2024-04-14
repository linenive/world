import { IEyeSight } from "./IEyeSight";
import { Vector3 } from "./Vector3";
import { Global } from "./Global";
import { IWorldObject } from "./IWorldObject";

export class EyeSight implements IEyeSight {
    private owner: IWorldObject;
    private sightLocalPosition: Vector3 = new Vector3(0, 0.8, 0);
    private sightLength: number = 10;
    private fov: number = 120;

    public constructor(owner: IWorldObject) {
        this.owner = owner;
    }

    public getSightPosition(): Vector3 {
        return Vector3.add(
            this.owner.getPosition(), this.sightLocalPosition);
    }

    public getSightLength(): number {
        return this.sightLength;
    }
    
    public getFov(): number {
        return this.fov;
    }
    
    public canSee(point: Vector3): boolean {
        return !Global.I().world?.checkCollisions(
            this.owner.getId(), this.getSightPosition(), point);
    }
}