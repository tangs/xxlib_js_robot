// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Fish = require("../../pkg/catchfish/fish");


// 围绕目标鱼 圆周 旋转的小鱼( 实现自己的 Move 函数并附加几个计算参数, 被 BigFish Move 调用 )
class RoundFish extends Fish {
    pkgTypeId = RoundFish.pkgTypeId;

    // 目标大鱼到当前小鱼的角度
    // float
    tarAngle: number = 0.0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.FLOAT,
                key: 'tarAngle',
            },
        );
    }

    static pkgTypeId = 82;
}

module.exports = RoundFish;
