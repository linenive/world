import { World } from './World';
import { Person } from './Person';

export class Game {
    private world: World;
    private person: Person;

    constructor() {
        this.world = new World();
        this.person = new Person();

        setInterval(() => this.gameLoop(), 1000 / 60);
    }

    private update(): void{
        console.log('Game update');
    }

    private gameLoop(): void{
        this.update();
    }
}