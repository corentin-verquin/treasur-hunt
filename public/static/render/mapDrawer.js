import ImageManager from "./imageManager.js"

export default class MapDrawer {
    #map = null
    #canvas = null
    #context = null

    constructor(canvas) {
        this.#canvas = document.getElementById(canvas)
        this.#context = this.#canvas.getContext('2d')
    }

    async init() {
        this.#canvas.width = 640 * 4 + 12 * 32
        this.#canvas.height = 640 * 4 + 12 * 32

        await ImageManager.init()
    }

    set map(map) {
        this.#map = map
    }

    draw() {
        for (const tile of this.#map.WATER) {
            tile.draw(this.#context)
        }

        for (const tile of this.#map.SAND) {
            tile.draw(this.#context)
        }

        for (const tile of this.#map.GRASS) {
            tile.draw(this.#context)
        }

        for (const tile of this.#map.DARK_GRASS) {
            tile.draw(this.#context)
        }
    }
}