// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

const StageElement = require("../../../PKG/CatchFish/Stages/StageElement");

// 发射器: 从屏幕中间 0 度开始旋转式出小鱼
class Emitter_CircleFishs extends StageElement {
    typeId = Emitter_CircleFishs.typeId;

    // 配置: 起始角度
    // float
    cfg_angleBegin: number = 0.0;
    // 配置: 每只鱼偏转角度
    // float
    cfg_angleIncrease: number = 0.0;
    // 配置: 两只鱼生成帧间隔
    // int32_t
    cfg_bornTicksInterval: number = 0;
    // 配置: 每只鱼币值
    // int64_t
    // $FlowFixMe
    cfg_coin: any = BigInt(0);
    // 配置: 每只鱼体积
    // float
    cfg_scale: number = 0.0;
    // 配置: 每只鱼移动速度( 帧跨越像素距离 )
    // float
    cfg_speed: number = 0.0;
    // 记录下次生成需要的帧编号( 在生成时令该值 = Stage.ticks + cfg_bornTicksInterval )
    // int32_t
    bornAvaliableTicks: number = 0;
    // 当前角度
    // float
    angle: number = 0.0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.FLOAT,
                key: 'cfg_angleBegin',
            },
            {
                type: DataType.FLOAT,
                key: 'cfg_angleIncrease',
            },
            {
                type: DataType.INT32,
                key: 'cfg_bornTicksInterval',
            },
            {
                type: DataType.INT64,
                key: 'cfg_coin',
            },
            {
                type: DataType.FLOAT,
                key: 'cfg_scale',
            },
            {
                type: DataType.FLOAT,
                key: 'cfg_speed',
            },
            {
                type: DataType.INT32,
                key: 'bornAvaliableTicks',
            },
            {
                type: DataType.FLOAT,
                key: 'angle',
            },
        );
    }

    static typeId = 81;

}

module.exports = Emitter_CircleFishs;
