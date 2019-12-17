// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 帧事件同步包
class FrameEvents extends PkgBase {
    typeId = FrameEvents.typeId;

    props: {}  = {
        // 帧编号
        // int32_t
        frameNumber: 0,
        // 帧事件集合
        // xx::List_s<PKG::CatchFish::Events::Event_s>
        events: [],
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'frameNumber',
            },
            {
                type: DataType.LIST,
                key: 'events',
            },
        );
    }

    static typeId = 11;

}

module.exports = FrameEvents;
