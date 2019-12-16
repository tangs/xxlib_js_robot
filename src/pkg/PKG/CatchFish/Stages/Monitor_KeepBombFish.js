// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Monitor_KeepBigFish = require("../../../PKG/CatchFish/Stages/Monitor_KeepBigFish");

// 监视器: 自动再生炸弹, 服务端预约下发
class Monitor_KeepBombFish extends Monitor_KeepBigFish {
    typeId = Monitor_KeepBombFish.typeId;

}

module.exports = Monitor_KeepBombFish;
