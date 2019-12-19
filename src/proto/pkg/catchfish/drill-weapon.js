// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
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
