// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Fish = require("../../../PKG/CatchFish/Configs/Fish");

// 彩色鱼特殊配置( 红: 炸弹  绿：狂暴  蓝：钻头  白: 闪电 )
class ColorFish extends Fish {
    typeId = ColorFish.typeId;
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
    weapon: any = null;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.FLOAT,
                key: 'moveFrameDistance',
            },
            {
                type: DataType.INT8,
                key: 'r',
            },
            {
                type: DataType.INT8,
                key: 'g',
            },
            {
                type: DataType.INT8,
                key: 'b',
            },
            {
                type: DataType.OBJ,
                key: 'weapon',
            },
        );
    }

    static typeId = 104;

}

module.exports = ColorFish;
