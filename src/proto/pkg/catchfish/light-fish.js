// @flow

const { PkgBase, DataType } = require("../../pkg-base");
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
