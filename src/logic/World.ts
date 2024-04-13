import { Dictionary } from "./Core";
import { IWorldObject } from "./IWorldObject"

export class World{
    private objects : Dictionary<number, IWorldObject> = new Dictionary<number, IWorldObject>;

    public addObject(object: IWorldObject): void{
        this.objects.add(object.getId(), object);
    }

    public getIterWorldObjects() : Iterable<IWorldObject> {
        return this.objects.getIterable();
    }
}