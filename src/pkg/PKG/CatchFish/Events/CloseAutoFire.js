// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

const Event = require("../../../PKG/CatchFish/Events/Event");

// 转发: 玩家解除自动开火
class CloseAutoFire extends Event {
    typeId = CloseAutoFire.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 49;

}

module.exports = CloseAutoFire;
