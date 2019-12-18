// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 心跳保持兼延迟测试 -- 请求
class Ping extends PkgBase {
    typeId = Ping.typeId;

    // int64_t
    // $FlowFixMe
    ticks: any = BigInt(0);

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT64,
                key: 'ticks',
            },
        );
    }

    static typeId = 5;

}

module.exports = Ping;
