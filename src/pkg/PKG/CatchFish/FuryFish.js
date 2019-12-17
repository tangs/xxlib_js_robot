// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const ColorFish = require("../../PKG/CatchFish/ColorFish");

// 狂暴鱼( 绿 )
class FuryFish extends ColorFish {
    typeId = FuryFish.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 97;

}

module.exports = FuryFish;
