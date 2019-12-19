// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
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
