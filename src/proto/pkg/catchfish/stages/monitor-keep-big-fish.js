// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const StageElement = require("../../../pkg/catchfish/stages/stage-element");


// 监视器: 自动再生大鱼, 服务端预约下发
class Monitor_KeepBigFish extends StageElement {
    pkgTypeId = Monitor_KeepBigFish.pkgTypeId;

    // 配置: 两条鱼生成帧间隔
    // int32_t
    cfg_bornTicksInterval: number = 0;
    // 配置: 鱼总数限制
    // int32_t
    cfg_numFishsLimit: number = 0;
    // 配置: 预约延迟
    // int32_t
    cfg_bornDelayFrameNumber: number = 0;
    // 记录下次生成需要的帧编号( 在生成时令该值 = Stage.ticks + cfg_bornTicksInterval )
    // int32_t
    bornAvaliableTicks: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'cfg_bornTicksInterval',
            },
            {
                type: DataType.INT32,
                key: 'cfg_numFishsLimit',
            },
            {
                type: DataType.INT32,
                key: 'cfg_bornDelayFrameNumber',
            },
            {
                type: DataType.INT32,
                key: 'bornAvaliableTicks',
            },
        );
    }

    static pkgTypeId = 86;
}

module.exports = Monitor_KeepBigFish;
