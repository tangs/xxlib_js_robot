const Event = require("../Event")
const { PkgBase, DataType } = require("../../../PkgBase")

class FishDead extends Event {
    typeId = FishDead.typeId;

    weaponId = -1;          // int32
    cannonId = -1;          // int32
    bulletId = -1;          // int32
    coin = -1;              // int32
    ids = null;             // obj
    
    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'weaponId',
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
                type: DataType.INT32,
                key: 'coin',
            },
            {
                type: DataType.OBJ,
                key: 'ids',
            },
        );
    }

}

FishDead.typeId = 41;

module.exports = FishDead;
