// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");


// 关卡元素基类
class StageElement extends PkgBase {
    pkgTypeId = StageElement.pkgTypeId;

    // 生效时间点
    // int32_t
    cfg_beginTicks: number = 0;
    // 结束时间点
    // int32_t
    cfg_endTicks: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'cfg_beginTicks',
            },
            {
                type: DataType.INT32,
                key: 'cfg_endTicks',
            },
        );
    }

    static pkgTypeId = 75;
}

module.exports = StageElement;
