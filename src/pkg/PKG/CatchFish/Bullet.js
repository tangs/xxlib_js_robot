// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const MoveItem = require("../../PKG/CatchFish/MoveItem");

// 子弹基类
class Bullet extends MoveItem {
    typeId = Bullet.typeId;

    props: {}  = {
        // 金币 / 倍率( 记录炮台开火时的 Bet 值 )
        // int64_t
        // $FlowFixMe
        coin: BigInt(0),
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT64,
                key: 'coin',
            },
        );
    }

    static typeId = 32;

}

module.exports = Bullet;
