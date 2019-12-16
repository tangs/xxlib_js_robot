// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Fish = require("../../PKG/CatchFish/Fish");

// 围绕目标鱼 圆周 旋转的小鱼( 实现自己的 Move 函数并附加几个计算参数, 被 BigFish Move 调用 )
class RoundFish extends Fish {
    typeId = RoundFish.typeId;
    // 目标大鱼到当前小鱼的角度
    // float
    tarAngle: number = 0.0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.FLOAT,
                key: 'tarAngle',
            },
        );
    }

    static typeId = 82;

}

module.exports = RoundFish;
