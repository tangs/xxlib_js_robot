// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Weapon = require("../../pkg/catchfish/weapon");


// 狂暴鱼武器
class FuryWeapon extends Weapon {
    pkgTypeId = FuryWeapon.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 111;
}

module.exports = FuryWeapon;
