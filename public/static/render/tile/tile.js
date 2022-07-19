import ImageManager from "../imageManager.js"

export default class Tile {
    #tileSize = 32
    #neighboreOffset = this.#tileSize / 4
    mainImage = null

    constructor(id, x, y, neighbor) {
        this.id = id
        this.x = x
        this.y = y
        this.neighbor = neighbor
        this.neighborType = this.id - 1
    }

    draw(context) {
        context.drawImage(
            this.mainImage, // image
            0, this.#tileSize * 4, // position in image
            this.#tileSize, this.#tileSize, // size of cutting in image
            this.x * this.#tileSize, this.y * this.#tileSize, // position where start draw
            this.#tileSize, this.#tileSize // size of drawing image
        )
        this.#drawNeighbor(context)
    }

    #drawNeighbor(context) {
        const neighborImg = ImageManager.getById(this.neighborType)

        if (this.neighbor.length > 0) {
            if (this.neighbor[1] == this.neighborType) {
                this.#drawTop(context, neighborImg)
            }

            if (this.neighbor[3] == this.neighborType) {
                this.#drawLeft(context, neighborImg)
            }

            if (this.neighbor[4] == this.neighborType) {
                this.#drawRight(context, neighborImg)
            }

            if (this.neighbor[6] == this.neighborType) {
                this.#drawBottom(context, neighborImg)
            }

            if (this.neighbor[0] == this.neighborType) {
                this.#drawTopLeftCorner(context, neighborImg)
            }

            if (this.neighbor[2] == this.neighborType) {
                this.#drawTopRightCorner(context, neighborImg)
            }

            if (this.neighbor[5] == this.neighborType) {
                this.#drawBotLeftCorner(context, neighborImg)
            }

            if (this.neighbor[7] == this.neighborType) {
                this.#drawBotRightCorner(context, neighborImg)
            }
        }
    }

    #drawTop(context, img) {
        context.drawImage(
            img,
            0, this.#tileSize * 2 + this.#tileSize / 2,
            this.#tileSize, this.#tileSize / 2,
            this.x * this.#tileSize, this.y * this.#tileSize - this.#neighboreOffset,
            this.#tileSize, this.#tileSize / 2
        )
    }

    #drawLeft(context, img) {
        context.drawImage(
            img,
            this.#tileSize / 2, this.#tileSize,
            this.#tileSize / 2, this.#tileSize,
            this.x * this.#tileSize - this.#neighboreOffset, this.y * this.#tileSize,
            this.#tileSize / 2, this.#tileSize
        )
    }

    #drawBottom(context, img) {
        context.drawImage(
            img,
            0, this.#tileSize * 2,
            this.#tileSize, this.#tileSize / 2,
            this.x * this.#tileSize, this.y * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset,
            this.#tileSize, this.#tileSize / 2
        )
    }

    #drawRight(context, img) {
        context.drawImage(
            img,
            0, this.#tileSize,
            this.#tileSize / 2, this.#tileSize,
            this.x * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset, this.y * this.#tileSize,
            this.#tileSize / 2, this.#tileSize
        )
    }

    #drawTopLeftCorner(context, img) {
        if (this.neighbor[3] == this.neighborType
            && this.neighbor[1] == this.neighborType) {

            context.drawImage(
                img,
                this.#tileSize / 2, this.#tileSize * 3 + this.#tileSize / 2,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize - this.#neighboreOffset, this.y * this.#tileSize - this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        } else if (this.neighbor[3] == this.id
            && this.neighbor[1] == this.id) {

            context.drawImage(
                img,
                this.#tileSize / 2, this.#tileSize / 2,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize - this.#neighboreOffset, this.y * this.#tileSize - this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        }
    }

    #drawTopRightCorner(context, img) {
        if (this.neighbor[4] == this.neighborType
            && this.neighbor[1] == this.neighborType) {

            context.drawImage(
                img,
                0, this.#tileSize * 3 + this.#tileSize / 2,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset, this.y * this.#tileSize - this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        } else if (this.neighbor[4] == this.id
            && this.neighbor[1] == this.id) {

            context.drawImage(
                img,
                0, this.#tileSize / 2,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset, this.y * this.#tileSize - this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        }
    }

    #drawBotLeftCorner(context, img) {
        if (this.neighbor[3] == this.neighborType
            && this.neighbor[6] == this.neighborType) {

            context.drawImage(
                img,
                this.#tileSize / 2, this.#tileSize * 3,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize - this.#neighboreOffset, this.y * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        } else if (this.neighbor[3] == this.id
            && this.neighbor[6] == this.id) {

            context.drawImage(
                img,
                this.#tileSize / 2, 0,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize - this.#neighboreOffset, this.y * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        }
    }

    #drawBotRightCorner(context, img) {
        if (this.neighbor[4] == this.neighborType
            && this.neighbor[6] == this.neighborType) {

            context.drawImage(
                img,
                0, this.#tileSize * 3,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset, this.y * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        } else if (this.neighbor[4] == this.id
            && this.neighbor[6] == this.id) {

            context.drawImage(
                img,
                0, 0,
                this.#tileSize / 2, this.#tileSize / 2,
                this.x * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset, this.y * this.#tileSize + this.#tileSize / 2 + this.#neighboreOffset,
                this.#tileSize / 2, this.#tileSize / 2
            )
        }
    }
}