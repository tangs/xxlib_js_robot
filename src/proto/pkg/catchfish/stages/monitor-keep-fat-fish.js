﻿// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Emitter_RandomFishs = require("../../../pkg/catchfish/stages/emitter-random-fishs");


// 监视器: 自动再生肥鱼, 服务端预约下发
class Monitor_KeepFatFish extends Emitter_RandomFishs {
    pkgTypeId = Monitor_KeepFatFish.pkgTypeId;

    // 配置: 鱼总数限制
    // int32_t
    cfg_numFishsLimit: number = 0;
    // 配置: 预约延迟
    // int32_t
    cfg_bornDelayFrameNumber: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
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

    static pkgTypeId = 77;
}

module.exports = Monitor_KeepFatFish;
