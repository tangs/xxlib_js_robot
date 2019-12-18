// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 开启开火锁定
class OpenAutoLock extends Event {
    typeId = OpenAutoLock.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 45;

}

module.exports = OpenAutoLock;
