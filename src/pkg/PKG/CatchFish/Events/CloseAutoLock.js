﻿// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 转发: 玩家开火解除锁定
class CloseAutoLock extends Event {
    typeId = CloseAutoLock.typeId;

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 47;

}

module.exports = CloseAutoLock;