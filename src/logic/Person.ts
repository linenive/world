import { Vector3 } from "./Core";
import { IWorldObject } from "./IWorldObject";

export class Person implements IWorldObject {
    private id: number;
    private name: string;
    private position: Vector3;
    
    constructor(id: number) {
        this.id = id;
        this.name = 'John Doe'
        this.position = {x: 0, y: 0, z: 0};
    }

    update(){
        console.log(this.name +' update');
    }

    public getId(): number {
        return this.id;
    }

    public getPosition(): Vector3 {
        return this.position;
    }
}