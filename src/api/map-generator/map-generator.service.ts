import { Inject } from "@nestjs/common";
import { Iconfig } from '../../configuration'
import PerlinNoise from "./utils/PerlinNoise";
import { TileType } from "./utils/TileType";

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

    public generate() {

        const map = []
        const level = Object.keys(TileType).filter(x => parseInt(x) >= 0)

        for (let y = 0; y < this.configuration.node; y++) {
            const mapLigne = []
            for (let x = 0; x < this.configuration.node; x++) {
                const noisHeight = this.#octaveGeneration(x, y)
                const tile = this.#tileGeneration(noisHeight,level)


                mapLigne.push(tile)

            }
            map.push(mapLigne)
        }

        return map
    }
}

