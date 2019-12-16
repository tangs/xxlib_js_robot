// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const StageElement = require("../../../PKG/CatchFish/Stages/StageElement");

// 发射器: 随机小鱼
class Emitter_RandomFishs extends StageElement {
    typeId = Emitter_RandomFishs.typeId;
    // 配置: 两条鱼生成帧间隔
    // int32_t
    cfg_bornTicksInterval: number = 0;
    // 配置: 币值
    // int64_t
    // $FlowFixMe
    cfg_coin: any = BigInt(0);
    // 配置: 体积随机起始范围
    // float
    cfg_scaleFrom: number = 0.0;
    // 配置: 体积随机结束范围
    // float
    cfg_scaleTo: number = 0.0;
    // 记录下次生成需要的帧编号( 在生成时令该值 = Stage.ticks + cfg_bornTicksInterval )
    // int32_t
    bornAvaliableTicks: number = 0;

    constructor() {
        super();
        this.datas.push(
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
                key: 'cfg_scaleFrom',
            },
            {
                type: DataType.FLOAT,
                key: 'cfg_scaleTo',
            },
            {
                type: DataType.INT32,
                key: 'bornAvaliableTicks',
            },
        );
    }

    static typeId = 76;

}

module.exports = Emitter_RandomFishs;
