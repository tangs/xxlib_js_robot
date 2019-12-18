// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Monitor_KeepBigFish = require("../../../pkg/catchfish/stages/monitor-keep-big-fish");


// 监视器: 自动再生炸弹, 服务端预约下发
class Monitor_KeepBombFish extends Monitor_KeepBigFish {
    typeId = Monitor_KeepBombFish.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 108;

}

module.exports = Monitor_KeepBombFish;
