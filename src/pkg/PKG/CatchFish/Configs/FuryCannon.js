// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

const Cannon = require("../../../PKG/CatchFish/Configs/Cannon");

// 狂暴炮台( 炮台打出数量有限的大威力子弹. 威力用每 Fire 子弹数量体现. 增加单发与鱼死亡检测次数, 显得更容易打死鱼 )
class FuryCannon extends Cannon {
    typeId = FuryCannon.typeId;

    // 打击次数( fireCount = coin / hitCount )
    // int32_t
    hitCount: number = 0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'hitCount',
            },
        );
    }

    static typeId = 106;

}

module.exports = FuryCannon;
