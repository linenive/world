import { IWorldObject } from "./IWorldObject";
import { Vector3 } from "three";
import { Color, Quaternion } from "three";
import { ExtendedVector3 } from "./VectorExtensions";

export class Wall implements IWorldObject {
    private id: number;
    private position: Vector3;
    private size: Vector3;
    private force: Vector3;
    // 기본은 파란 색
    private color: Color | null = null;

    constructor(
        id: number, position: Vector3, size: Vector3, color?: Color) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.force = ExtendedVector3.Zero;
        if (color) {
            this.color = color;
        }
    }

    update() {
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
        return new Quaternion();
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

    public getSight(): null {
        return null;
    }

    public getColor(): Color | null {
        return this.color;
    }
}