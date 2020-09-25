interface Point {
    x: number,
    y: number,
    moveTo(otherPoint: Point): number
}

function newPoint(x: number, y: number): Point {
    return {
        x: x,
        y: y,
        moveTo(otherPoint) {
            return Math.sqrt(Math.pow(otherPoint.x, 2) + Math.pow(otherPoint.y, 2))
        }
    }
}

const homePosition: Point = newPoint(0, 0);