import Water from '../render/tile/water.js'
import Sand from '../render/tile/sand.js'
import Grass from '../render/tile/grass.js'
import DarkGrass from '../render/tile/darkGrass.js'

export default async function mapGenertor() {
    return await fetch('/map-generator')
        .then(x => x.json())
        .then(data => {
            data.WATER = data.WATER.map(tile => new Water(tile.coord.x, tile.coord.y, tile.neighbor))
            data.SAND = data.SAND.map(tile => new Sand(tile.coord.x, tile.coord.y, tile.neighbor))
            data.GRASS = data.GRASS.map(tile => new Grass(tile.coord.x, tile.coord.y, tile.neighbor))
            data.DARK_GRASS = data.DARK_GRASS.map(tile => new DarkGrass(tile.coord.x, tile.coord.y, tile.neighbor))

            return data
        })
}