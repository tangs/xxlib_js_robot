const { PkgBase, DataType } = require("./PkgBase")

class Pong extends PkgBase {
    typeId = Pong.typeId;
    ticks = BigInt(0); // int64

    constructor() {
        super();
        this.datas.push({
            type: DataType.INT64,
            key: 'ticks',
        });
    }
}

Pong.typeId = 6;

module.exports = Pong;
