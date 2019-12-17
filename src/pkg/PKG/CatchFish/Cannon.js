// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Item = require("../../PKG/CatchFish/Item");

// 炮台基类. 下列属性适合大多数炮
class Cannon extends Item {
    typeId = Cannon.typeId;

    props: {}  = {
        // 配置id
        // int32_t
        cfgId: 0,
        // 币值 / 倍率 ( 初始填充自 db. 玩家可调整数值. 范围限制为 Scene.minBet ~ maxBet )
        // int64_t
        // $FlowFixMe
        coin: BigInt(0),
        // 炮管角度 ( 每次发射时都填充一下 )
        // float
        angle: 0.0,
        // 所有子弹
        // xx::List_s<PKG::CatchFish::Bullet_s>
        bullets: [],
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'cfgId',
            },
            {
                type: DataType.INT64,
                key: 'coin',
            },
            {
                type: DataType.FLOAT,
                key: 'angle',
            },
            {
                type: DataType.LIST,
                key: 'bullets',
            },
        );
    }

    static typeId = 28;

}

module.exports = Cannon;
