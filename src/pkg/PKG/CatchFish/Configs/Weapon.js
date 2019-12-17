// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

const PKG__CatchFish__Configs__Cannon = require("../../../PKG/CatchFish/Configs/Cannon");
const Item = require("../../../PKG/CatchFish/Configs/Item");

// 打爆彩色鱼出现的特殊武器配置基类
class Weapon extends Item {
    typeId = Weapon.typeId;

    // 展示文本( 为简化设计先这样 )
    // std::string_s
    txt: string = "";
    // 展示时长 ( 帧数 )
    // int32_t
    showNumFrames: number = 0;
    // 每帧移动距离
    // float
    distance: number = 0.0;
    // 爆炸半径( for bomb, light... )
    // float
    explodeRadius: number = 0.0;
    // 飞到玩家坐标之后变化出来的炮台 cfg 之基类
    // PKG::CatchFish::Configs::Cannon_s
    cannon: PKG__CatchFish__Configs__Cannon;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.STRING,
                key: 'txt',
            },
            {
                type: DataType.INT32,
                key: 'showNumFrames',
            },
            {
                type: DataType.FLOAT,
                key: 'distance',
            },
            {
                type: DataType.FLOAT,
                key: 'explodeRadius',
            },
            {
                type: DataType.OBJ,
                key: 'cannon',
            },
        );
    }

    static typeId = 64;

}

module.exports = Weapon;
