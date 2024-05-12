import { IWorldObject } from "./IWorldObject";
import { Vector3 } from "./Vector3";
import { ForceVector } from "./PhysicsModel";
import { Color } from "three";

export class Wall implements IWorldObject {
    private id: number;
    private position: Vector3;
    private size: Vector3;
    // 기본은 파란 색
    private color: Color | null = null;

    constructor(
        id: number, position: Vector3, size: Vector3, color?: Color) {
        this.id = id;
        this.position = position;
        this.size = size;
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
        return this.position;
    }

    public setPosition(position: Vector3): void {
        this.position = position;
    }

    public getSize(): Vector3 {
        return this.size;
    }

    public getForce(): ForceVector {
        return { direction: Vector3.Zero, magnitude: 0 };
    }

    public getSight(): null {
        return null;
    }

    public getColor(): Color | null {
        return this.color;
    }
}