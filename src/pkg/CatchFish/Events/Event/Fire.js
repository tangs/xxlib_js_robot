const Event = require("../Event")
const { PkgBase, DataType } = require("../../../PkgBase")

class Fire extends Event {
    typeId = Fire.typeId;

    playerId = -1;       // int32
    frameNumber = -1;    // int32
    cannonId = -1;       // int32
    bulletId = -1;       // int32
    angle = -1;          // float
    
    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'frameNumber',
            },
            {
                type: DataType.INT32,
                key: 'cannonId',
            },
            {
                type: DataType.INT32,
                key: 'bulletId',
            },
            {
                type: DataType.FLOAT,
                key: 'angle',
            },
        );
    }

}

Fire.typeId = 50;

module.exports = Fire;
