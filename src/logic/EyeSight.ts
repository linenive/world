import * as THREE from 'three'
import { IEyeSight } from "./IEyeSight";
import { Vector3 } from "./Vector3";
import { Global } from "./Global";
import { IWorldObject } from "./IWorldObject";
import { degrees2Radians } from "./Angle";
import { ObjectDistanceSquared } from "./IGlobalWorld";

export class EyeSight implements IEyeSight {
    private owner: IWorldObject;
    private sightLocalPosition: Vector3 = new Vector3(0, 0.8, 0);
    private sightLength: number = 10;
    /** degree 시야각 */
    private fov: number = 120;
    private sightDirection: Vector3;

    public constructor(owner: IWorldObject) {
        this.owner = owner;
        // 앞을 바라보는 방향으로 설정
        var forward = new THREE.Euler(-1.5, 0, 0);
        var forwardVector = new THREE.Vector3();
        forwardVector.setFromEuler(forward);
        this.sightDirection = new Vector3(
            forwardVector.x, forwardVector.y, forwardVector.z);
        this.sightDirection.normalize();
    }

    public getSightPosition(): Vector3 {
        return Vector3.add(
            this.owner.getPosition(), this.sightLocalPosition);
    }

    public getSightLength(): number {
        return this.sightLength;
    }

    /** fov/2 한 radian 시야각을 얻습니다. */
    public getHalfFovRadian(): number {
        return degrees2Radians(this.fov / 2);
    }

    public getDirection(): Vector3 {
        return this.sightDirection;
    }

    public canSee(point: Vector3): boolean {
        return !Global.I().world?.checkCollisions(
            this.owner.getId(), this.getSightPosition(), point);
    }

    public getClosest3(): ObjectDistanceSquared[] {
        var objects = Global.I().world?.checkObjectsInSight(
            this.owner.getId(), this
        );

        objects?.sort(this.sortBySecondElement);

        return objects?.slice(0, 3) || [];
    }

    // 두 번째 항목을 기준으로 오름차순으로 정렬하는 비교 함수
    private sortBySecondElement(a: ObjectDistanceSquared, b: ObjectDistanceSquared): number {
        return a[1] - b[1];
    }
}