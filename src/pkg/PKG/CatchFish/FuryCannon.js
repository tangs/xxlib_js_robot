// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Cannon = require("../../PKG/CatchFish/Cannon");

// 狂暴炮台
class FuryCannon extends Cannon {
    typeId = FuryCannon.typeId;

}

module.exports = FuryCannon;
