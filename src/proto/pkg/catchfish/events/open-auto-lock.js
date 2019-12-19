// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 开启开火锁定
class OpenAutoLock extends Event {
    pkgTypeId = OpenAutoLock.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 45;
}

module.exports = OpenAutoLock;
