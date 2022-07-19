export default class Vector {

    constructor(public x:number, public y:number, public z:number = 0){}

    public scalar2(vector):number {
        return this.x * vector.x + this.y * vector.y
    }

    public scalar3(vector):number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    public static get gradient(): Vector[] {
        const x1y1 = [
            new Vector(1, 1, 0),
            new Vector(-1, 1, 0),
            new Vector(1, -1, 0),
            new Vector(-1, -1, 0)
        ]

        const x1z1 = [
            new Vector(1, 0, 1),
            new Vector(-1, 0, 1),
            new Vector(1, 0, -1),
            new Vector(-1, 0, -1)
        ]

        const y1z1 = [
            new Vector(0, 1, 1),
            new Vector(0, -1, 1),
            new Vector(0, 1, -1),
            new Vector(0, -1, -1)
        ]

        return [...x1y1, ...x1z1, ...y1z1]
    }
}
