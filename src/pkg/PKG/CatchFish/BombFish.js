// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const ColorFish = require("../../PKG/CatchFish/ColorFish");

// 炸弹鱼( 红 )
class BombFish extends ColorFish {
    typeId = BombFish.typeId;

}

module.exports = BombFish;
