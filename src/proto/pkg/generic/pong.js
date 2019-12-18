// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 心跳保持兼延迟测试 -- 回应
class Pong extends PkgBase {
    typeId = Pong.typeId;

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

    static typeId = 6;

}

module.exports = Pong;
