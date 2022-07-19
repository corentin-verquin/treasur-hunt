import ImageManager from "../imageManager.js";
import Tile from "./tile.js";

export default class Grass extends Tile{
    constructor(x, y, neighbor) {
        super(2,x,y,neighbor)
        this.mainImage = ImageManager.grass
    }
}