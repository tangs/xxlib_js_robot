// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const ColorFish = require("../../pkg/catchfish/color-fish");


// 钻头鱼( 蓝 )
class DrillFish extends ColorFish {
    pkgTypeId = DrillFish.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 98;
}

module.exports = DrillFish;
