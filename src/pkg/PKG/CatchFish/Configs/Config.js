// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

const PKG__CatchFish__Way = require("../../../PKG/CatchFish/Way");
const PKG__CatchFish__Configs__Fish = require("../../../PKG/CatchFish/Configs/Fish");
const PKG__CatchFish__Configs__Cannon = require("../../../PKG/CatchFish/Configs/Cannon");
const PKG__CatchFish__Configs__Weapon = require("../../../PKG/CatchFish/Configs/Weapon");
const PKG__CatchFish__Stages__Stage = require("../../../PKG/CatchFish/Stages/Stage");

// 游戏配置主体
class Config extends PkgBase {
    typeId = Config.typeId;

    // 所有固定路径( 工具创建 )
    // xx::List_s<PKG::CatchFish::Way_s>
    fixedWays: PKG__CatchFish__Way[] = [];
    // 所有鱼的配置信息
    // xx::List_s<PKG::CatchFish::Configs::Fish_s>
    fishs: PKG__CatchFish__Configs__Fish[] = [];
    // 所有炮台的配置信息
    // xx::List_s<PKG::CatchFish::Configs::Cannon_s>
    cannons: PKG__CatchFish__Configs__Cannon[] = [];
    // 所有武器的配置信息
    // xx::List_s<PKG::CatchFish::Configs::Weapon_s>
    weapons: PKG__CatchFish__Configs__Weapon[] = [];
    // 循环关卡数据( Scene 初次创建时，从 stages[0] clone. 可以在内存中 cache 序列化后的 binary )
    // xx::List_s<PKG::CatchFish::Stages::Stage_s>
    stages: PKG__CatchFish__Stages__Stage[] = [];
    // 基于设计尺寸为 1280 x 720, 屏中心为 0,0 点的 4 个玩家炮台的坐标( 0: 左下  1: 右下    2: 右上  3: 左上 )
    // xx::List_s<::xx::Pos>
    sitPositons: [] = [];
    // 锁定点击范围 ( 增加容错, 不必点的太精确. 点击作用是 枚举该范围内出现的鱼, 找出并选取 touchRank 最大值那个 )
    // float
    aimTouchRadius: number = 0.0;
    // 普通鱼最大半径 ( 用于生成鱼线确保鱼出现时刚好位于屏幕外 )
    // float
    normalFishMaxRadius: number = 0.0;
    // 显示非当前玩家子弹时是否启用追帧快进令其同步( 会导致高延迟玩家发射的子弹看上去离炮口有点远 )
    // bool
    enableBulletFastForward: bool = false;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.LIST,
                key: 'fixedWays',
            },
            {
                type: DataType.LIST,
                key: 'fishs',
            },
            {
                type: DataType.LIST,
                key: 'cannons',
            },
            {
                type: DataType.LIST,
                key: 'weapons',
            },
            {
                type: DataType.LIST,
                key: 'stages',
            },
            {
                type: DataType.LIST,
                key: 'sitPositons',
            },
            {
                type: DataType.FLOAT,
                key: 'aimTouchRadius',
            },
            {
                type: DataType.FLOAT,
                key: 'normalFishMaxRadius',
            },
            {
                type: DataType.INT8,
                key: 'enableBulletFastForward',
            },
        );
    }

    static typeId = 57;

}

module.exports = Config;
