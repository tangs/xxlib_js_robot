// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Bullet = require("../../pkg/catchfish/bullet");


// 狂暴子弹
class FuryBullet extends Bullet {
    pkgTypeId = FuryBullet.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 100;
}

module.exports = FuryBullet;
