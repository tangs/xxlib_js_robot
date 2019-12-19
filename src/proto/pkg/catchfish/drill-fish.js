// @flow

const { PkgBase, DataType } = require("../../pkg-base");
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
