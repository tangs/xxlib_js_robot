// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

// 带物理检测区和锁定线等附加数据的鱼移动帧动画
class FishSpriteFrame extends PkgBase {
    typeId = FishSpriteFrame.typeId;

    props: {}  = {
        // 指向精灵帧
        // PKG::CatchFish::Configs::SpriteFrame_s
        frame: null,
        // 指向物理建模
        // PKG::CatchFish::Configs::Physics_s
        physics: null,
        // 首选锁定点( 如果该点还在屏幕上, 则 lock 准星一直在其上 )
        // ::xx::Pos
        lockPoint: null,
        // 锁定点集合( 串成一条线的锁定点. 当首选锁定点不在屏上时, 使用该线与所在屏的边线的交点作为锁定点 )
        // xx::List_s<::xx::Pos>
        lockPoints: [],
        // 本帧动画切到下一帧动画后应该移动的距离( 受 Fish.speedScale 影响 )
        // float
        moveDistance: 0.0,
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.OBJ,
                key: 'frame',
            },
            {
                type: DataType.OBJ,
                key: 'physics',
            },
            {
                type: DataType.XX_POS,
                key: 'lockPoint',
            },
            {
                type: DataType.LIST,
                key: 'lockPoints',
            },
            {
                type: DataType.FLOAT,
                key: 'moveDistance',
            },
        );
    }

    static typeId = 71;

}

module.exports = FishSpriteFrame;
