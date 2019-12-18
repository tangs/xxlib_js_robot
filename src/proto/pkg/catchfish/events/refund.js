// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 通知: 退钱( 常见于子弹并发打中某鱼产生 miss 或鱼id未找到 或子弹生命周期结束 )
class Refund extends Event {
    typeId = Refund.typeId;

    // 退款金额( coin * count )
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT64,
                key: 'coin',
            },
        );
    }

    static typeId = 40;

}

module.exports = Refund;
