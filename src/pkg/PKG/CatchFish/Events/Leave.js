// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 通知: 玩家离开
class Leave extends Event {
    typeId = Leave.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 38;

}

module.exports = Leave;
