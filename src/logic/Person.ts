import { IWorldObject } from "./IWorldObject";
import { IEyeSight } from "./IEyeSight";
import { EyeSight } from "./EyeSight";
import { Color, Quaternion } from "three";
import { Vector3 } from "three";
import { ExtendedVector3 } from "./VectorExtensions";

export class Person implements IWorldObject {
    private id: number;
    private name: string;
    private position: Vector3;
    private direction: Quaternion;
    private size: Vector3 = new Vector3(0.2, 1, 0.2);
    private force: Vector3;
    private eyeSight: IEyeSight = new EyeSight(this);

    constructor(id: number) {
        this.id = id;
        this.name = 'John Doe'
        this.position = ExtendedVector3.Zero;
        // 초기 방향은 Forward이다.
        this.direction = new Quaternion();
        this.force = ExtendedVector3.Zero;
    }

    public update() {
        console.log(this.name + ' update');
    }

    public getId(): number {
        return this.id;
    }

    public getPosition(): Vector3 {
        return this.position.clone();
    }

    public setPosition(new_position: Vector3): void {
        this.position.x = new_position.x;
        this.position.y = new_position.y;
        this.position.z = new_position.z;
    }

    public getDirection(): Quaternion {
        return this.direction.clone();
    }

    public rotateLeft(): void {
        const angle = Math.PI / 4;
        const axis = new Vector3(0, 1, 0); // y축
        const quaternion = new Quaternion().setFromAxisAngle(axis, angle);

        this.direction.multiply(quaternion);
    }

    public rotateRight(): void {
        const angle = -Math.PI / 4;
        const axis = new Vector3(0, 1, 0); // y축
        const quaternion = new Quaternion().setFromAxisAngle(axis, angle);

        this.direction.multiply(quaternion);
    }

    public getSize(): Vector3 {
        return this.size;
    }

    public getForce(): Vector3 {
        return this.force.clone();
    }

    public setForce(new_force: Vector3): void {
        this.force.x = new_force.x;
        this.force.y = new_force.y;
        this.force.z = new_force.z;
    }

    public getSight(): IEyeSight | null {
        return this.eyeSight;
    }

    public getColor(): Color | null {
        return null;
    }
}