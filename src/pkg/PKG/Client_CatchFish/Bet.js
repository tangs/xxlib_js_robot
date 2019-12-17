// @flow

const { PkgBase, DataType } = require("../../PkgBase");


// 调整炮台倍率
class Bet extends PkgBase {
    typeId = Bet.typeId;

    // int32_t
    cannonId: number = 0;
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'cannonId',
            },
            {
                type: DataType.INT64,
                key: 'coin',
            },
        );
    }

    static typeId = 87;

}

module.exports = Bet;
