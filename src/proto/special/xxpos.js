// @flow

class XXPos {
    x: number = 0;
    y: number = 0;

    constructor(x?: number, y?: number) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
}

module.exports = XXPos;
