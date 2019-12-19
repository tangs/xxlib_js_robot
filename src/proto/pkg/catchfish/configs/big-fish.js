// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Fish = require("../../../pkg/catchfish/configs/fish");


// 小鱼环绕的大鱼的特殊配置
class BigFish extends Fish {
    pkgTypeId = BigFish.pkgTypeId;

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
        this.pkgDatasType.push(
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

    static pkgTypeId = 85;
}

module.exports = BigFish;
