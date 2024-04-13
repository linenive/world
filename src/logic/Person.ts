import { Vector3 } from "./Vector3";
import { IWorldObject } from "./IWorldObject";
import { ForceVector } from "./PhysicsModel";

export class Person implements IWorldObject {
    private id: number;
    private name: string;
    private position: Vector3;
    private force: ForceVector = {direction: {x: 0, y:0, z: 0}, magnitude: 0};
    
    constructor(id: number) {
        this.id = id;
        this.name = 'John Doe'
        this.position = Vector3.Zero;
        this.force.direction = Vector3.Forward;
        this.force.magnitude = 0.01;
    }

    update(){
        console.log(this.name +' update');
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

    public getForce(): ForceVector {
        return this.force;
    }
}