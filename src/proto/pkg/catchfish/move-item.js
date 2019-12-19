// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Item = require("../../pkg/catchfish/item");


// 子弹 & 鱼 & 武器 的基类
class MoveItem extends Item {
    pkgTypeId = MoveItem.pkgTypeId;

    // 中心点坐标
    // ::xx::Pos
    pos: XXPos;
    // 当前角度
    // float
    angle: number = 0.0;
    // 每帧的直线移动坐标增量( 不一定用得上 )
    // ::xx::Pos
    moveInc: XXPos;

    constructor() {
        super();
        this.pkgDatasType.push(
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

    static pkgTypeId = 33;
}

module.exports = MoveItem;
