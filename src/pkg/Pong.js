const { PkgBase, DataType } = require("./PkgBase")

class Pong extends PkgBase {
    typeId = 6;
    ticks = BigInt(0); // int64
    datas = [
        {
            type: DataType.INT64,
            key: 'ticks',
        }
    ];
}

module.exports = Pong;
