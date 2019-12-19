// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 通知: 玩家离开
class Leave extends Event {
    pkgTypeId = Leave.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 38;
}

module.exports = Leave;
