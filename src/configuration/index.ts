import { TileType } from "src/api/map-generator/utils/TileType"

export interface Iconfig {
    node: number
    scale: number
    octave: number
    lacunarity: number
    persistance: number
    tileLevelBorn: {
        [TileType.WATTER]: number,
        [TileType.SAND]: number
        [TileType.GRASS]: number
        [TileType.DARK_GRASS]: number
    }
}
export const Iconfig = Symbol('Iconfig')

export default class config implements Iconfig {
    public node = 80;
    public scale = 20;
    public octave = 4;
    public lacunarity = 2;
    public persistance = 0.3;
    public tileLevelBorn

    constructor() {
        this.tileLevelBorn = {
            [TileType.WATTER]: -0.3,
            [TileType.SAND]: 0,
            [TileType.GRASS]: 0.3,
            [TileType.DARK_GRASS]: 1
        }
    }
}