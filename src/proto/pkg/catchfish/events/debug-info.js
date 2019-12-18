﻿// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 调试信息( 开发阶段校验用 )
class DebugInfo extends Event {
    typeId = DebugInfo.typeId;

    // 鱼id集合
    // xx::List_s<int32_t>
    fishIds: number[] = [];

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.LIST_INT32,
                key: 'fishIds',
            },
        );
    }

    static typeId = 53;

}

module.exports = DebugInfo;