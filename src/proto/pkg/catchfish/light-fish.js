// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const ColorFish = require("../../pkg/catchfish/color-fish");


// 闪电鱼( 白 )
class LightFish extends ColorFish {
    pkgTypeId = LightFish.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 109;
}

module.exports = LightFish;
