const { PkgBase, DataType } = require("./PkgBase")
class FrameEvents extends PkgBase {
    typeId = FrameEvents.typeId;
    frameNumber = 0; // int32
    events = null;

    datas = [
        {
            type: DataType.INT32,
            key: 'frameNumber',
        },
        {
            type: DataType.OBJ,
            key: 'events',
        }
    ];
}

FrameEvents.typeId = 11;

module.exports = FrameEvents;
