// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Fish = require("../../../PKG/CatchFish/Configs/Fish");

// 小鱼环绕的大鱼的特殊配置
class BigFish extends Fish {
    typeId = BigFish.typeId;

    // 每帧移动距离
    // float
    moveFrameDistance: number = 0.0;
    // 小鱼只数
    // int32_t
    numChilds: number = 0;
    // 小鱼前进角速度
    // float
    childsAngleInc: number = 0.0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.FLOAT,
                key: 'moveFrameDistance',
            },
            {
                type: DataType.INT32,
                key: 'numChilds',
            },
            {
                type: DataType.FLOAT,
                key: 'childsAngleInc',
            },
        );
    }

    static typeId = 85;

}

module.exports = BigFish;
