// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 转发: 切换炮台倍率
class CannonCoinChange extends Event {
    typeId = CannonCoinChange.typeId;

    props: {}  = {
        // 炮台id
        // int32_t
        cannonId: 0,
        // 币值 / 倍率
        // int64_t
        // $FlowFixMe
        coin: BigInt(0),
    };

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
