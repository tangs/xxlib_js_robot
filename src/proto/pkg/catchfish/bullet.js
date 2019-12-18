// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const MoveItem = require("../../pkg/catchfish/move-item");


// 子弹基类
class Bullet extends MoveItem {
    typeId = Bullet.typeId;

    // 金币 / 倍率( 记录炮台开火时的 Bet 值 )
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);

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
