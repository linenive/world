import { World } from './World';
import { Person } from './Person';
import { Wall } from './Wall';
import { Vector3 } from './Vector3';

export class Game {
    private world: World;

    constructor() {
        this.world = new World();
        var samplePerson = new Person(1);
        this.world.addObject(samplePerson);
        
        var sampleWall = new Wall(
            2,
            new Vector3(0, 0, 3),
            new Vector3(1, 1, 1));
        this.world.addObject(sampleWall)

        setInterval(() => this.gameLoop(), 1000 / 60);
    }

    public getWorld(): World {
        return this.world;
    }

    private update(): void{
        this.world.update();
    }

    private gameLoop(): void{
        this.update();
    }
}