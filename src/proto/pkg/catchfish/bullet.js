// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const MoveItem = require("../../pkg/catchfish/move-item");


// 子弹基类
class Bullet extends MoveItem {
    pkgTypeId = Bullet.pkgTypeId;

    // 金币 / 倍率( 记录炮台开火时的 Bet 值 )
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT64,
                key: 'coin',
            },
        );
    }

    static pkgTypeId = 32;
}

module.exports = Bullet;
