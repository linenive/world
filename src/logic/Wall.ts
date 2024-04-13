import { IWorldObject } from "./IWorldObject";
import { Vector3 } from "./Vector3";
import { ForceVector } from "./PhysicsModel";

export class Wall implements IWorldObject {
    private id: number;
    private position: Vector3;
    private size: Vector3;
    
    constructor(id: number, position: Vector3, size: Vector3) {
        this.id = id;
        this.position = position;
        this.size = size;
    }

    update(){
    }

    public getId(): number {
        return this.id;
    }

    public getPosition(): Vector3 {
        return this.position;
    }

    public setPosition(position: Vector3): void {
        this.position = position;
    }

    public getSize(): Vector3 {
        return this.size;
    }

    public getForce(): ForceVector {
        return {direction: Vector3.Zero, magnitude: 0};
    }
}