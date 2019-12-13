const Event = require("../Event")
const { PkgBase, DataType } = require("../../../PkgBase")

class Scene extends Event {
    typeId = Fire.typeId;

    gameId = -1;            // int32
    levelId = -1;           // int32
    roomId = -1;            // int32
    minMoney = -1;          // double
    minBet = -1;            // int64
    maxBet = -1;            // int64
    stepBet = -1;           // int64
    exchangeCoinRatio = -1; // int32
    frameNumber = -1;       // int32
    rnd = -1;               // int32
    autoIncId = -1;         // int32
    fishs = [];             // int32
    items = [];             // int32
    borns = [];             // int32
    
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

Scene.typeId = 50;

module.exports = Scene;
