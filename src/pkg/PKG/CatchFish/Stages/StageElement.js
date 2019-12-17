// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

// 关卡元素基类
class StageElement extends PkgBase {
    typeId = StageElement.typeId;

    props: {}  = {
        // 生效时间点
        // int32_t
        cfg_beginTicks: 0,
        // 结束时间点
        // int32_t
        cfg_endTicks: 0,
    };

    constructor() {
        super();
        this.datas.push(
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

    static typeId = 75;

}

module.exports = StageElement;
