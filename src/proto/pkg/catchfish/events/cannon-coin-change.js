// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 切换炮台倍率
class CannonCoinChange extends Event {
    pkgTypeId = CannonCoinChange.pkgTypeId;

    // 炮台id
    // int32_t
    cannonId: number = 0;
    // 币值 / 倍率
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

    static pkgTypeId = 52;
}

module.exports = CannonCoinChange;
