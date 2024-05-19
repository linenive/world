import { EyeSight } from "./EyeSight";
import { IWorldObject } from "./IWorldObject";
import { Vector3 } from "three";

export type ObjectDistanceSquared = [IWorldObject, number];

// 세계 중 글로벌하게 접근 가능한 부분을 정의한다. 주로 ReadOnly로 사용한다.
export interface IGlobalWorld {
    checkCollisions(ignoreId: number, from: Vector3, to: Vector3): boolean;
    checkObjectsInSight(ignoreId: number, eyeSight: EyeSight): ObjectDistanceSquared[];
}