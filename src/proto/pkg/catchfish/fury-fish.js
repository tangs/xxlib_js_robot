// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const ColorFish = require("../../pkg/catchfish/color-fish");


// 狂暴鱼( 绿 )
class FuryFish extends ColorFish {
    pkgTypeId = FuryFish.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 97;
}

module.exports = FuryFish;
