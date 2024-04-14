import { IGlobalWorld } from "./IGlobalWorld";

export class Global {
    public world: IGlobalWorld | undefined;

    private static instance: Global;

    public static I(): Global {
        // 인스턴스가 없을 경우에만 생성
        if (!Global.instance) {
            Global.instance = new Global();
        }
        return Global.instance;
    }

    public set(world: IGlobalWorld) {
        this.world = world;
    }

    private constructor() {}
}