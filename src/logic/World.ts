import { Dictionary } from "./Core";
import { Global } from "./Global";
import { IGlobalWorld } from "./IGlobalWorld";
import { IWorldObject } from "./IWorldObject"
import { Vector3, checkCollision } from "./Vector3";

export class World implements IGlobalWorld {
    private objects : Dictionary<number, IWorldObject> = new Dictionary<number, IWorldObject>;

    public static createWorld(): World {
        const world = new World();
        Global.I().set(world);
        return world;
    }

    public addObject(object: IWorldObject): void{
        this.objects.add(object.getId(), object);
    }

    public getIterWorldObjects() : Iterable<IWorldObject> {
        return this.objects.getIterable();
    }

    public update(): void{
        for (const obj of this.getIterWorldObjects()) {
            this.updatePosition(obj);
        }
    }

    public updatePosition(object: IWorldObject): void{
        const force = object.getForce();
        if (force.magnitude < Number.EPSILON) {
            return;
        }

        console.log(object.getForce());
        
        const position = object.getPosition();
        const newPosition = new Vector3(
            position.x + force.direction.x * force.magnitude,
            position.y + force.direction.y * force.magnitude,
            position.z + force.direction.z * force.magnitude
        );

        if (this.checkCollisions(object.getId(), position, newPosition)) {
            return;
        }

        object.setPosition(newPosition);
    }

    private constructor() { }

    // 아직 이동 주체의 부피를 고려하지는 않습니다.
    public checkCollisions(
        ignoreId: number,
        from: Vector3,
        to: Vector3
    ): boolean{
        for (const obj of this.getIterWorldObjects()) {
            if (obj.getId() === ignoreId) {
                continue;
            }

            if (checkCollision(from, to, obj.getPosition(), obj.getSize())){
                return true;
            }
        }
        return false;
    }
}