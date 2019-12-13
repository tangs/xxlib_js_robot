const { PkgBase, DataType } = require("./PkgBase")

class Ping extends PkgBase {
    typeId = Ping.typeId;
    ticks = BigInt(0); // int64
    datas = [
        {
            type: DataType.INT64,
            key: 'ticks',
        }
    ];
}

Ping.typeId = 5;

module.exports = Ping;
