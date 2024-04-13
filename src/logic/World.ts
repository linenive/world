import { Dictionary, Epsilon } from "./Core";
import { IWorldObject } from "./IWorldObject"

export class World {
    private objects : Dictionary<number, IWorldObject> = new Dictionary<number, IWorldObject>;

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
        const newPosition = {
            x: position.x + force.direction.x * force.magnitude,
            y: position.y + force.direction.y * force.magnitude,
            z: position.z + force.direction.z * force.magnitude
        };
        object.setPosition(newPosition);
    }
}