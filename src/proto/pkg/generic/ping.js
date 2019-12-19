// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");


// 心跳保持兼延迟测试 -- 请求
class Ping extends PkgBase {
    pkgTypeId = Ping.pkgTypeId;

    // int64_t
    // $FlowFixMe
    ticks: any = BigInt(0);

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT64,
                key: 'ticks',
            },
        );
    }

    static pkgTypeId = 5;
}

module.exports = Ping;
