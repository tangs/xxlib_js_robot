// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 玩家解除自动开火
class CloseAutoFire extends Event {
    pkgTypeId = CloseAutoFire.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 49;
}

module.exports = CloseAutoFire;
