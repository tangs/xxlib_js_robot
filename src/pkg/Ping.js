const { PkgBase, DataType } = require("./PkgBase")

class Ping extends PkgBase {
    typeId = Ping.typeId;
    ticks = BigInt(0); // int64

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT64,
                key: 'ticks',
            },
        );
    }
}

Ping.typeId = 5;

module.exports = Ping;
