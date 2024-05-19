import { World } from './World';
import { Person } from './Person';
import { Wall } from './Wall';
import { Vector3, Vector2 } from 'three';
import { Color } from 'three';

export class Game {
    private world: World;
    private player: Person;

    constructor() {
        this.world = World.createWorld();
        this.player = new Person(1);
        this.world.addObject(this.player);

        this.makeRoom(new Vector3(-3, 0, 3), new Vector2(6, 4), 2);

        setInterval(() => this.gameLoop(), 1000 / 60);
    }

    public getWorld(): World {
        return this.world;
    }

    public getPlayer(): Person {
        return this.player;
    }

    private update(): void {
        this.world.update();
    }

    private gameLoop(): void {
        this.update();
    }

    private makeRoom(
        right_top: Vector3, room_size: Vector2, height: number): void {
        const wall_width = 0.1;

        var top = new Wall(
            10,
            right_top.clone().add(new Vector3(room_size.x / 2, 0, 0)),
            new Vector3(room_size.x, height, wall_width),
            new Color(0xff0000));
        var bottom = new Wall(
            11,
            right_top.clone().add(new Vector3(room_size.x / 2, 0, -room_size.y)),
            new Vector3(room_size.x, height, wall_width),
            new Color(0xffaaaa));
        var left = new Wall(
            12,
            new Vector3(right_top.x, right_top.y, right_top.z - room_size.y / 2),
            new Vector3(wall_width, height, room_size.y),
            new Color(0xffcccc));
        var right = new Wall(
            13,
            new Vector3(right_top.x + room_size.x, right_top.y, right_top.z - room_size.y / 2),
            new Vector3(wall_width, height, room_size.y),
            new Color(0xffeeee));
        this.world.addObject(top);
        this.world.addObject(bottom);
        this.world.addObject(left);
        this.world.addObject(right);
    }
}