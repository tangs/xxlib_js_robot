// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Weapon = require("../../pkg/catchfish/weapon");


// 钻头鱼武器
class DrillWeapon extends Weapon {
    pkgTypeId = DrillWeapon.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 112;
}

module.exports = DrillWeapon;
