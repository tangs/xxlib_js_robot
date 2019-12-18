// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 切换炮台倍率
class CannonCoinChange extends Event {
    typeId = CannonCoinChange.typeId;

    // 炮台id
    // int32_t
    cannonId: number = 0;
    // 币值 / 倍率
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

    static typeId = 52;

}

module.exports = CannonCoinChange;
