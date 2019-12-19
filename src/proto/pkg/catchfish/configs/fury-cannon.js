// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Cannon = require("../../../pkg/catchfish/configs/cannon");


// 狂暴炮台( 炮台打出数量有限的大威力子弹. 威力用每 Fire 子弹数量体现. 增加单发与鱼死亡检测次数, 显得更容易打死鱼 )
class FuryCannon extends Cannon {
    pkgTypeId = FuryCannon.pkgTypeId;

    // 打击次数( fireCount = coin / hitCount )
    // int32_t
    hitCount: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'hitCount',
            },
        );
    }

    static pkgTypeId = 106;
}

module.exports = FuryCannon;
