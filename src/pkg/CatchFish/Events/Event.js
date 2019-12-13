const { PkgBase, DataType } = require("../../PkgBase")

class Fire extends PkgBase {
    typeId = Fire.typeId;

    playerId = 0;       // int32
    frameNumber = 0;    // int32
    cannonId = 0;       // int32
    bulletId = 0;       // int32
    angle = 0;          // float
    
    constructor() {
        super();
        this.datas.push({
            type: DataType.INT32,
            key: 'playerId',
        });
    }
}

Fire.typeId = 50;

module.exports = Fire;
