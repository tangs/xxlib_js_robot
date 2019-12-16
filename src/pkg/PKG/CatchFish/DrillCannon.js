// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Cannon = require("../../PKG/CatchFish/Cannon");

// 钻头炮台
class DrillCannon extends Cannon {
    typeId = DrillCannon.typeId;

}

module.exports = DrillCannon;
