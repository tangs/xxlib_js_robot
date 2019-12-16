// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 通知: 玩家离开
class Leave extends Event {
    typeId = Leave.typeId;

}

module.exports = Leave;
