// @flow

const { PkgBase, DataType } = require("../../pkg-base");
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
