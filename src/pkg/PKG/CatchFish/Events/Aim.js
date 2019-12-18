﻿// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 玩家锁定后瞄准某鱼
class Aim extends Event {
    typeId = Aim.typeId;

    // 被瞄准的鱼id
    // int32_t
    fishId: number = 0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'fishId',
            },
        );
    }

    static typeId = 46;

}

module.exports = Aim;
