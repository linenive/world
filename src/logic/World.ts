import { Dictionary } from "./Core";
import { EyeSight } from "./EyeSight";
import { Global } from "./Global";
import { IGlobalWorld, ObjectDistanceSquared } from "./IGlobalWorld";
import { IWorldObject } from "./IWorldObject"
import { Person } from "./Person";
import { checkCollision } from "./VectorExtensions";
import { Quaternion, Vector3 } from "three";

export class World implements IGlobalWorld {
    private objects: Dictionary<number, IWorldObject> = new Dictionary<number, IWorldObject>;

    public static createWorld(): World {
        const world = new World();
        Global.I().set(world);
        return world;
    }

    public addObject(object: IWorldObject): void {
        this.objects.add(object.getId(), object);
    }

    public getIterWorldObjects(): Iterable<IWorldObject> {
        return this.objects.getIterable();
    }

    public update(): void {
        for (const obj of this.getIterWorldObjects()) {
            this.updatePosition(obj);

            // 사람인 경우
            if (obj instanceof Person) {
                // TODO: 시야 내보내기.
                // const person = obj as Person;
                // const eyeSight = person.getSight();
                // const closest3 = eyeSight!.getClosest3();
            }
        }
    }

    public updatePosition(object: IWorldObject): void {
        const force = object.getForce();
        if (force.lengthSq() < Number.EPSILON) {
            return;
        }

        const position = object.getPosition();
        const quaternion: Quaternion = object.getDirection();
        // 회전된 힘(쿼터니언을 적용한 힘)
        const rotatedForce = force.clone().applyQuaternion(quaternion);
        const newPosition = position.clone().add(rotatedForce.multiplyScalar(0.1));

        if (this.checkCollisions(object.getId(), position, newPosition)) {
            return;
        }

        object.setPosition(newPosition);

        // 힘 줄이기
        force.multiplyScalar(0.5);
        object.setForce(force);
    }

    private constructor() { }

    // 아직 이동 주체의 부피를 고려하지는 않습니다.
    public checkCollisions(
        ignoreId: number,
        from: Vector3,
        to: Vector3
    ): boolean {
        for (const obj of this.getIterWorldObjects()) {
            if (obj.getId() === ignoreId) {
                continue;
            }

            if (checkCollision(from, to, obj.getPosition(), obj.getSize())) {
                return true;
            }
        }
        return false;
    }

    /** 
     * 해당 오브젝트의 중심이 시야 내에 있는 지 확인합니다.
     * 아직 오브젝트의 부피를 고려하지는 않습니다.
     */
    private checkObjectInSight(
        target: IWorldObject,
        eyeSight: EyeSight
    ): boolean {
        // 캐릭터의 위치를 기준으로 시야 벡터 계산
        var sightVector = eyeSight.getDirection().normalize();
        sightVector.multiplyScalar(eyeSight.getSightLength());

        // 캐릭터에서 대상까지의 벡터
        var objectVector = target.getPosition().sub(
            eyeSight.getSightPosition());

        // 시야 벡터와 대상 벡터 사이의 각도 계산
        var angleBetween = sightVector.angleTo(objectVector);

        // 시야 각도 내에 있는지 확인
        if (angleBetween <= eyeSight.getHalfFovRadian()) {
            // 대상과의 거리가 시야 범위 내에 있는지 확인
            if (eyeSight.getSightPosition().distanceToSquared(target.getPosition()) <=
                eyeSight.getSightLength() * eyeSight.getSightLength()) {
                return true;
            }
        }
        return false;
    }

    public checkObjectsInSight(
        ignoreId: number,
        eyeSight: EyeSight
    ): ObjectDistanceSquared[] {
        var objectsInSight: ObjectDistanceSquared[] = [];
        for (const obj of this.getIterWorldObjects()) {
            if (obj.getId() === ignoreId) {
                continue;
            }

            if (this.checkObjectInSight(obj, eyeSight)) {
                objectsInSight.push([
                    obj,
                    obj.getPosition().distanceToSquared(
                        eyeSight.getSightPosition())
                ]);
            }
        }
        return objectsInSight;
    }
}