// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 发子弹( 单次 ). 非特殊子弹, 只可能是 cannons[0] 原始炮台发射
class Fire extends Event {
    pkgTypeId = Fire.pkgTypeId;

    // 起始帧编号 ( 来自客户端 )
    // int32_t
    frameNumber: number = 0;
    // 炮台id
    // int32_t
    cannonId: number = 0;
    // 子弹id
    // int32_t
    bulletId: number = 0;
    // 发射角度
    // float
    angle: number = 0.0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'frameNumber',
            },
            {
                type: DataType.INT32,
                key: 'cannonId',
            },
            {
                type: DataType.INT32,
                key: 'bulletId',
            },
            {
                type: DataType.FLOAT,
                key: 'angle',
            },
        );
    }

    static pkgTypeId = 50;
}

module.exports = Fire;
