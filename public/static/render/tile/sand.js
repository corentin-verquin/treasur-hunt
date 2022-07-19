import ImageManager from "../imageManager.js";
import Tile from "./tile.js";

export default class Sand extends Tile{
    constructor(x, y, neighbor) {
        super(1,x,y,neighbor)
        this.mainImage = ImageManager.sand
    }
}