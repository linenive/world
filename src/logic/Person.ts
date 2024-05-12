import { Vector3 } from "./Vector3";
import { IWorldObject } from "./IWorldObject";
import { IEyeSight } from "./IEyeSight";
import { ForceVector } from "./PhysicsModel";
import { EyeSight } from "./EyeSight";
import { Color } from "three";

export class Person implements IWorldObject {
    private id: number;
    private name: string;
    private position: Vector3;
    private size: Vector3 = new Vector3(0.2, 1, 0.2);
    private force: ForceVector = { direction: new Vector3(0, 0, 0), magnitude: 0 };
    private eyeSight: IEyeSight = new EyeSight(this);

    constructor(id: number) {
        this.id = id;
        this.name = 'John Doe'
        this.position = Vector3.Zero;
        this.force.direction = Vector3.Forward;
        this.force.magnitude = 0.01;
    }

    public update() {
        console.log(this.name + ' update');
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
        return this.force;
    }

    public getSight(): IEyeSight | null {
        return this.eyeSight;
    }

    public getColor(): Color | null {
        return null;
    }
}