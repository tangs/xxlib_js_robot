// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const ColorFish = require("../../pkg/catchfish/color-fish");


// 炸弹鱼( 红 )
class BombFish extends ColorFish {
    pkgTypeId = BombFish.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 96;
}

module.exports = BombFish;
