// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const ColorFish = require("../../PKG/CatchFish/ColorFish");

// 闪电鱼( 白 )
class LightFish extends ColorFish {
    typeId = LightFish.typeId;

}

module.exports = LightFish;
