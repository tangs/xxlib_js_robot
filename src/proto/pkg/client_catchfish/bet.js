// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 调整炮台倍率
class Bet extends PkgBase {
    pkgTypeId = Bet.pkgTypeId;

    // int32_t
    cannonId: number = 0;
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);

    constructor() {
        super();
        this.pkgDatasType.push(
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

    static pkgTypeId = 87;
}

module.exports = Bet;
