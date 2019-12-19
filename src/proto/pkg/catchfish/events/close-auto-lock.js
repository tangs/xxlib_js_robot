// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 玩家开火解除锁定
class CloseAutoLock extends Event {
    pkgTypeId = CloseAutoLock.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 47;
}

module.exports = CloseAutoLock;
