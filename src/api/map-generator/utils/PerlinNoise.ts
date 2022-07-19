import GradientTable from "./GradientTable";
import Vector from "./Vector";

function fade(t){
    return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

export default class PerlinNoise {

    #gradientTable = new GradientTable()

    #getCellOrigin(x, y) {
        return new Vector(
            Math.floor(x),
            Math.floor(y)
        )
    }

    #getCellVector(orignVector, x, y) {
        return new Vector(
            x - orignVector.x,
            y - orignVector.y
        )
    }

    public value(x, y) {
        const orign = this.#getCellOrigin(x, y)
        const relativeVector = this.#getCellVector(orign, x, y)

        const oX = orign.x & 0xff
        const oY = orign.y & 0xff

        //get noise corner contribution
        // n01--n11
        //  |    |
        // n00--n10

        const n00 = this.#gradientTable.value(
            oX + this.#gradientTable.permutationTable[oY]
        ).scalar2(relativeVector)


        const n01 = this.#gradientTable.value(
            oX + this.#gradientTable.permutationTable[oY + 1]
        ).scalar2(new Vector(
            relativeVector.x,
            relativeVector.y - 1
        ))

        const n10 = this.#gradientTable.value(
            oX + 1 + this.#gradientTable.permutationTable[oY]
        ).scalar2(new Vector(
            relativeVector.x - 1,
            relativeVector.y
        ))

        const n11 = this.#gradientTable.value(
            oX + 1 + this.#gradientTable.permutationTable[oY + 1]
        ).scalar2(new Vector(
            relativeVector.x - 1,
            relativeVector.y - 1
        ))

        // get the fade value of x
        const u = fade(relativeVector.x)

        // Interpolate the noise result
        return lerp(
            lerp(n00, n10, u),
            lerp(n01, n11, u),
            fade(relativeVector.y)
        )
    }
}
