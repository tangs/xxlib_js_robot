// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Item = require("../../../PKG/CatchFish/Configs/Item");

// 鱼配置基类 ( 派生类中不再包含 sprite frame 相关, 以便于资源加载管理扫描 )
class Fish extends Item {
    typeId = Fish.typeId;

    // 金币 / 倍率随机范围 ( 最小值 )
    // int64_t
    // $FlowFixMe
    minCoin: any = BigInt(0);
    // 金币 / 倍率随机范围 ( 最大值 )
    // int64_t
    // $FlowFixMe
    maxCoin: any = BigInt(0);
    // 基于整个鱼的最大晃动范围的圆形碰撞检测半径( 2 判. <= 0 则直接进行 3 判: 物理检测 )
    // float
    maxDetectRadius: number = 0.0;
    // 必然命中的最小检测半径( 1 判. <= 0 则直接进行 2 判. 如果 bulletRadius + minDetectRadius > 子弹中心到鱼中心的距离 就认为命中 )
    // float
    minDetectRadius: number = 0.0;
    // 移动帧集合 ( 部分鱼可能具有多种移动状态, 硬编码确定下标范围 )
    // xx::List_s<PKG::CatchFish::Configs::FishSpriteFrame_s>
    moveFrames: [] = [];
    // 鱼死帧集合
    // xx::List_s<PKG::CatchFish::Configs::SpriteFrame_s>
    dieFrames: [] = [];
    // 点选优先级说明参数, 越大越优先
    // int32_t
    touchRank: number = 0;
    // 影子显示时的放大系数. 平时与 scale 相等. 部分 boss 影子比身体小.
    // float
    shadowScale: number = 0.0;
    // 影子的偏移坐标
    // ::xx::Pos
    shadowOffset: any = null;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT64,
                key: 'minCoin',
            },
            {
                type: DataType.INT64,
                key: 'maxCoin',
            },
            {
                type: DataType.FLOAT,
                key: 'maxDetectRadius',
            },
            {
                type: DataType.FLOAT,
                key: 'minDetectRadius',
            },
            {
                type: DataType.LIST,
                key: 'moveFrames',
            },
            {
                type: DataType.LIST,
                key: 'dieFrames',
            },
            {
                type: DataType.INT32,
                key: 'touchRank',
            },
            {
                type: DataType.FLOAT,
                key: 'shadowScale',
            },
            {
                type: DataType.XX_POS,
                key: 'shadowOffset',
            },
        );
    }

    static typeId = 60;

}

module.exports = Fish;
