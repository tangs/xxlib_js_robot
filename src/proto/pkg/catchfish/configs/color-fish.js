// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Fish = require("../../../pkg/catchfish/configs/fish");

const PKG__CatchFish__Configs__Weapon = require("../../../pkg/catchfish/configs/weapon");

// 彩色鱼特殊配置( 红: 炸弹  绿：狂暴  蓝：钻头  白: 闪电 )
class ColorFish extends Fish {
    pkgTypeId = ColorFish.pkgTypeId;

    // 每帧移动距离
    // float
    moveFrameDistance: number = 0.0;
    // 红色数值
    // uint8_t
    r: number = 0;
    // 绿色数值
    // uint8_t
    g: number = 0;
    // 蓝色数值
    // uint8_t
    b: number = 0;
    // 鱼死后变的 weapon( 根据这个来选择创建相应类型的 Fish )
    // PKG::CatchFish::Configs::Weapon_s
    weapon: PKG__CatchFish__Configs__Weapon;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.FLOAT,
                key: 'moveFrameDistance',
            },
            {
                type: DataType.UINT8,
                key: 'r',
            },
            {
                type: DataType.UINT8,
                key: 'g',
            },
            {
                type: DataType.UINT8,
                key: 'b',
            },
            {
                type: DataType.OBJ,
                key: 'weapon',
            },
        );
    }

    static pkgTypeId = 104;
}

module.exports = ColorFish;
