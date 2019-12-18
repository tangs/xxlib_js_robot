// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


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
