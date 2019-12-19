// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");

const PKG__CatchFish__Events__Event = require("../../pkg/catchfish/events/event");

// 帧事件同步包
class FrameEvents extends PkgBase {
    pkgTypeId = FrameEvents.pkgTypeId;

    // 帧编号
    // int32_t
    frameNumber: number = 0;
    // 帧事件集合
    // xx::List_s<PKG::CatchFish::Events::Event_s>
    events: XXList<PKG__CatchFish__Events__Event>;

    constructor() {
        super();
        this.pkgDatasType.push(
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

    static pkgTypeId = 11;
}

module.exports = FrameEvents;
