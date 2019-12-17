// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

const Event = require("../../../PKG/CatchFish/Events/Event");

// 转发: 切换炮台
class CannonSwitch extends Event {
    typeId = CannonSwitch.typeId;

    // 炮台配置id
    // int32_t
    cfgId: number = 0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'cfgId',
            },
        );
    }

    static typeId = 51;

}

module.exports = CannonSwitch;
