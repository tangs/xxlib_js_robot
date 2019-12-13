const { PkgBase, DataType } = require("../../PkgBase")

class Fire extends PkgBase {
    typeId = Fire.typeId;

    playerId = 0;       // int32
    
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
