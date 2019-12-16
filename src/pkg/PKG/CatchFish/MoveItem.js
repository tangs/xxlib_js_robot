// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Item = require("../../PKG/CatchFish/Item");

// 子弹 & 鱼 & 武器 的基类
class MoveItem extends Item {
    typeId = MoveItem.typeId;
    // 中心点坐标
    // ::xx::Pos
    pos: any = null;
    // 当前角度
    // float
    angle: number = 0.0;
    // 每帧的直线移动坐标增量( 不一定用得上 )
    // ::xx::Pos
    moveInc: any = null;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.XX_POS,
                key: 'pos',
            },
            {
                type: DataType.FLOAT,
                key: 'angle',
            },
            {
                type: DataType.XX_POS,
                key: 'moveInc',
            },
        );
    }

    static typeId = 33;

}

module.exports = MoveItem;
