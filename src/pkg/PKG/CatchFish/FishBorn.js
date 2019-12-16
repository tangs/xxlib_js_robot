// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 预约出鱼
class FishBorn extends PkgBase {
    typeId = FishBorn.typeId;
    // 开始 / 生效帧编号
    // int32_t
    beginFrameNumber: number = 0;
    // 当 currentFrameNumber == beginFrameNumber 时，将 fish 放入 Scene.fishs 并自杀
    // PKG::CatchFish::Fish_s
    fish: any = null;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'beginFrameNumber',
            },
            {
                type: DataType.OBJ,
                key: 'fish',
            },
        );
    }

    static typeId = 23;

}

module.exports = FishBorn;
