// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

// 事件基类
class Event extends PkgBase {
    typeId = Event.typeId;
    // 相关玩家id
    // int32_t
    playerId: number = 0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'playerId',
            },
        );
    }

    static typeId = 13;

}

module.exports = Event;
