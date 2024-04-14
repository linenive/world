import { Vector3 } from "./Vector3";

// 세계 중 글로벌하게 접근 가능한 부분을 정의한다. 주로 ReadOnly로 사용한다.
export interface IGlobalWorld {
    checkCollisions(ignoreId: number, from: Vector3, to: Vector3): boolean;
}