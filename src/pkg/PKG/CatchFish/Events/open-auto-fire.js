// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 玩家自动开火
class OpenAutoFire extends Event {
    typeId = OpenAutoFire.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 48;

}

module.exports = OpenAutoFire;
