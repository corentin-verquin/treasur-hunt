import ImageManager from "../imageManager.js";
import Tile from "./tile.js";

export default class DarkGrass extends Tile{
    constructor(x, y, neighbor) {
        super(3,x,y,neighbor)
        this.mainImage = ImageManager.drak_grass
    }
}