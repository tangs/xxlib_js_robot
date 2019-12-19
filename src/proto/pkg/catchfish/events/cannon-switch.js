// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 切换炮台
class CannonSwitch extends Event {
    pkgTypeId = CannonSwitch.pkgTypeId;

    // 炮台配置id
    // int32_t
    cfgId: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'cfgId',
            },
        );
    }

    static pkgTypeId = 51;
}

module.exports = CannonSwitch;
