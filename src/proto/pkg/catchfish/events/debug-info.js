// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 调试信息( 开发阶段校验用 )
class DebugInfo extends Event {
    pkgTypeId = DebugInfo.pkgTypeId;

    // 鱼id集合
    // xx::List_s<int32_t>
    fishIds: XXList<number>;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.LIST_INT32,
                key: 'fishIds',
            },
        );
    }

    static pkgTypeId = 53;
}

module.exports = DebugInfo;
