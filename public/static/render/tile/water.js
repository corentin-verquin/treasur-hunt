import ImageManager from "../imageManager.js";
import Tile from "./tile.js";

export default class Water extends Tile{
    constructor(x, y, neighbor) {
        super(0,x,y,[])
        this.mainImage = ImageManager.water
    }
}