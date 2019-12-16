// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 转发: 开启开火锁定
class OpenAutoLock extends Event {
    typeId = OpenAutoLock.typeId;

}

module.exports = OpenAutoLock;
