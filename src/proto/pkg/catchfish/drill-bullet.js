// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Bullet = require("../../pkg/catchfish/bullet");


// 钻头子弹
class DrillBullet extends Bullet {
    pkgTypeId = DrillBullet.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 101;
}

module.exports = DrillBullet;
