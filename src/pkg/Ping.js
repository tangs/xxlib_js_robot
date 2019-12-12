const { PkgBase, DataType } = require("./PkgBase")

class Ping extends PkgBase {
    typeId = 5;
    ticks = BigInt(0); // int64
    datas = [
        {
            type: DataType.INT64,
            key: 'ticks',
        }
    ];
}

module.exports = Ping;
