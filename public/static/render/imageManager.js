export default class ImageManager {
    static water = null
    static sand = null
    static grass = null
    static drak_grass = null

    static async init() {
        this.water = new Image()
        this.sand = new Image()
        this.grass = new Image()
        this.drak_grass = new Image()

        await new Promise(r => this.water.onload = r, this.water.src = 'img/water.png');
        await new Promise(r => this.sand.onload = r, this.sand.src = 'img/sand.png');
        await new Promise(r => this.grass.onload = r, this.grass.src = 'img/grass.png');
        await new Promise(r => this.drak_grass.onload = r, this.drak_grass.src = 'img/dark-grass.png');
    }

    static getById(id) {
        switch (id) {
            case 0:
                return this.water
            case 1:
                return this.sand
            case 2:
                return this.grass
            case 3:
                return this.drak_grass
            default:
                return null
        }
    }
}