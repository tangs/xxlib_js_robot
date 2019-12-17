// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const MoveItem = require("../../PKG/CatchFish/MoveItem");

// 鱼基类( 支持每帧 pos += moveInc 简单移动 )
class Fish extends MoveItem {
    typeId = Fish.typeId;

    // 配置id
    // int32_t
    cfgId: number = 0;
    // 币值 / 倍率
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);
    // 移动速度系数 ( 默认为 1 )
    // float
    speedScale: number = 0.0;
    // 运行时缩放比例( 通常为 1 )
    // float
    scale: number = 0.0;
    // 当前帧下标( 循环累加 )
    // int32_t
    spriteFrameIndex: number = 0;
    // 帧比值, 平时为 1, 如果为 0 则表示鱼不动( 比如实现冰冻效果 ), 帧图也不更新. 如果大于 1, 则需要在 1 帧内多次驱动该鱼( 比如实现快速离场的效果 )
    // int32_t
    frameRatio: number = 0;

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
                key: 'speedScale',
            },
            {
                type: DataType.FLOAT,
                key: 'scale',
            },
            {
                type: DataType.INT32,
                key: 'spriteFrameIndex',
            },
            {
                type: DataType.INT32,
                key: 'frameRatio',
            },
        );
    }

    static typeId = 19;

}

module.exports = Fish;
