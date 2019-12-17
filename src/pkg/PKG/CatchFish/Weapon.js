// @flow

const { PkgBase, DataType } = require("../../PkgBase");

const MoveItem = require("../../PKG/CatchFish/MoveItem");

// 武器基类 ( 有一些特殊鱼死后会变做 某种武器 / 炮台，死时有个滞空展示时间，被用于解决网络同步延迟。所有端应该在展示时间结束前收到该预约。展示完成后武器将飞向炮台变为附加炮台 )
class Weapon extends MoveItem {
    typeId = Weapon.typeId;

    // 配置id
    // int32_t
    cfgId: number = 0;
    // 开始起作用的帧编号( 和预约下发相关 )
    // int32_t
    beginFrameNumber: number = 0;
    // 币值 / 倍率( 填充自死鱼 )
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'cfgId',
            },
            {
                type: DataType.INT32,
                key: 'beginFrameNumber',
            },
            {
                type: DataType.INT64,
                key: 'coin',
            },
        );
    }

    static typeId = 30;

}

module.exports = Weapon;
