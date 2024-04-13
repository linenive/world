import { World } from './World';
import { Person } from './Person';

export class Game {
    private world: World;

    constructor() {
        this.world = new World();
        var samplePerson = new Person(1);
        this.world.addObject(samplePerson);

        setInterval(() => this.gameLoop(), 1000 / 60);
    }

    public getWorld(): World {
        return this.world;
    }

    private update(): void{
    }

    private gameLoop(): void{
        this.update();
    }
}