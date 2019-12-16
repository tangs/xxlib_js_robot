// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Emitter_RandomFishs = require("../../../PKG/CatchFish/Stages/Emitter_RandomFishs");

// 监视器: 自动再生肥鱼, 服务端预约下发
class Monitor_KeepFatFish extends Emitter_RandomFishs {
    typeId = Monitor_KeepFatFish.typeId;
    // 配置: 鱼总数限制
    // int32_t
    cfg_numFishsLimit: number = 0;
    // 配置: 预约延迟
    // int32_t
    cfg_bornDelayFrameNumber: number = 0;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'cfg_numFishsLimit',
            },
            {
                type: DataType.INT32,
                key: 'cfg_bornDelayFrameNumber',
            },
        );
    }

    static typeId = 77;

}

module.exports = Monitor_KeepFatFish;
