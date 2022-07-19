import { Inject } from "@nestjs/common";
import { Iconfig } from '../../configuration'
import PerlinNoise from "./utils/PerlinNoise";
import { TileType } from "./utils/TileType";
import Vector from "./utils/Vector";

export default class MapGeneratorService {
    constructor(
        @Inject('config')
        private readonly configuration: Iconfig
    ) { }


    #seedGeneration(): number {
        return 2227.56755583442
        // return Math.random() * 200_000 / 2
    }

    #octaveGeneration(x: number, y: number, seed: number): number {
        const perlinNoise: PerlinNoise = new PerlinNoise()

        let amplitude: number = 1
        let frequency: number = 1
        let noisHeight: number = 0

        for (let octave = 0; octave < this.configuration.octave; octave++) {
            const Sx = x / this.configuration.scale * frequency + seed
            const Sy = y / this.configuration.scale * frequency + seed

            const perlinValue = perlinNoise.value(Sx, Sy)

            noisHeight += perlinValue * amplitude
            amplitude *= this.configuration.persistance
            frequency *= this.configuration.lacunarity
        }

        return noisHeight
    }

    #tileGeneration(noisHeight: number, level: Array<string>): TileType {
        let levelIndex: number = 0
        let tile: TileType = TileType.DARK_GRASS

        do {
            const currentLevel = level[levelIndex]

            if (noisHeight < this.configuration.tileLevelBorn[currentLevel]) {
                const tileKey = <keyof TileType>TileType[currentLevel]
                tile = TileType[tileKey]
                break
            }

            levelIndex++
        } while (levelIndex < level.length - 1)

        return tile
    }

    #boderGeneration(map: TileType[][]) {
        const internalBorder = [this.configuration.boderSize, this.configuration.node + this.configuration.boderSize - 1]
        const subBorder = [this.configuration.boderSize + 1, this.configuration.node + this.configuration.boderSize - 2]

        const changeToSand = (tile) => [TileType.DARK_GRASS, TileType.GRASS].includes(tile) ? TileType.SAND : tile
        const changeToGrass = (tile) => tile == TileType.DARK_GRASS ? TileType.GRASS : tile

        for (let i = 0; i < this.configuration.node; i++) {
            for (let j = 0; j < this.configuration.boderSize; j++) {
                map[i].push(TileType.WATER)
                map[i].unshift(TileType.WATER)
            }
            for (const k of internalBorder) {
                map[i][k] = changeToSand(map[i][k])
            }
            for (const k of subBorder) {
                map[i][k] = changeToGrass(map[i][k])
            }
        }

        for (let i = 0; i < this.configuration.boderSize; i++) {
            map.unshift(new Array(this.configuration.node + this.configuration.boderSize * 2).fill(TileType.WATER))
            map.push(new Array(this.configuration.node + this.configuration.boderSize * 2).fill(TileType.WATER))
        }

        for (const i of internalBorder) {
            map[i] = map[i].map(changeToSand)
        }

        for (const i of subBorder) {
            map[i] = map[i].map(changeToGrass)
        }
    }

    #schedulingTile(map: TileType[][]) {
        const types = Object.keys(TileType)
            .filter(x => !(parseInt(x) >= 0))
            .map(x => ({ [x]: [] }))
            .reduce((x, y) => ({ ...x, ...y }))

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {

                const tileType = TileType[map[y][x]]
                const coord = new Vector(x, y)
                const neighbor: TileType[] = []

                //store neighbor
                for (const i of [-1, 0, +1]) {
                    for (const j of [-1, 0, +1]) {
                        if (!(j == 0 && i == 0)) neighbor.push(map?.[y + i]?.[x + j] ?? TileType.WALL)
                    }
                }
                types[tileType].push({ coord, neighbor })
            }
        }

        return types
    }

    public generate() {
        const map: TileType[][] = []
        const level = Object.keys(TileType).filter(x => parseInt(x) >= 0)
        const seed: number = this.#seedGeneration()

        for (let y = 0; y < this.configuration.node; y++) {
            const mapLigne: TileType[] = []
            for (let x = 0; x < this.configuration.node; x++) {
                const noisHeight = this.#octaveGeneration(x, y, seed)
                const tile = this.#tileGeneration(noisHeight, level)

                mapLigne.push(tile)

            }
            map.push(mapLigne)
        }

        this.#boderGeneration(map)

        return this.#schedulingTile(map)
    }
}

