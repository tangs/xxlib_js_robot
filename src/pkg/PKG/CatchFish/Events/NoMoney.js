// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 通知: 玩家破产
class NoMoney extends Event {
    typeId = NoMoney.typeId;

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 39;

}

module.exports = NoMoney;
