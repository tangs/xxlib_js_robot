// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const ColorFish = require("../../pkg/catchfish/color-fish");


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
