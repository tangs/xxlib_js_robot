// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const StageElement = require("../../../pkg/catchfish/stages/stage-element");


// 发射器: 从屏幕中间圆环批量出小鱼
class Emitter_RingFishs extends StageElement {
    pkgTypeId = Emitter_RingFishs.pkgTypeId;

    // 配置: 每波鱼只数
    // int32_t
    cfg_numFishsPerBatch: number = 0;
    // 配置: 两波鱼生成帧间隔
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

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'cfg_numFishsPerBatch',
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
        );
    }

    static pkgTypeId = 78;
}

module.exports = Emitter_RingFishs;
