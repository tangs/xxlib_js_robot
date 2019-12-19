// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Fish = require("../../pkg/catchfish/fish");


// 色彩覆盖鱼, 打死后可能爆炸或得到某种武器/炮台. 切换炮台可能导致倍率基数发生变化( 如果支持倍率切换的话 )
class ColorFish extends Fish {
    pkgTypeId = ColorFish.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 95;
}

module.exports = ColorFish;
