// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
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
