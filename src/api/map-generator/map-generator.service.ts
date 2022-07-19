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

    #octaveGeneration(x: number, y: number): number {
        const seed: number = this.#seedGeneration()
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
                neighbor.push(map?.[y - 1]?.[x - 1] ?? TileType.WALL)
                neighbor.push(map?.[y - 1]?.[x] ?? TileType.WALL)
                neighbor.push(map?.[y - 1]?.[x + 1] ?? TileType.WALL)

                neighbor.push(map?.[y]?.[x - 1] ?? TileType.WALL)
                neighbor.push(map?.[y]?.[x + 1] ?? TileType.WALL)

                neighbor.push(map?.[y + 1]?.[x - 1] ?? TileType.WALL)
                neighbor.push(map?.[y + 1]?.[x] ?? TileType.WALL)
                neighbor.push(map?.[y + 1]?.[x + 1] ?? TileType.WALL)

                types[tileType].push({ coord, neighbor })
            }
        }

        return types
    }

    public generate() {

        const map = []
        const level = Object.keys(TileType).filter(x => parseInt(x) >= 0)

        for (let y = 0; y < this.configuration.node; y++) {
            const mapLigne = []
            for (let x = 0; x < this.configuration.node; x++) {
                const noisHeight = this.#octaveGeneration(x, y)
                const tile = this.#tileGeneration(noisHeight, level)


                mapLigne.push(tile)

            }
            map.push(mapLigne)
        }

        return this.#schedulingTile(map)
    }
}

