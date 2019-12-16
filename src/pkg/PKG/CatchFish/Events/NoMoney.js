// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 通知: 玩家破产
class NoMoney extends Event {
    typeId = NoMoney.typeId;

}

module.exports = NoMoney;
