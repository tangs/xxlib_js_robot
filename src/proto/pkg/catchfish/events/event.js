// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");


// 事件基类
class Event extends PkgBase {
    pkgTypeId = Event.pkgTypeId;

    // 相关玩家id
    // int32_t
    playerId: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'playerId',
            },
        );
    }

    static pkgTypeId = 13;
}

module.exports = Event;
