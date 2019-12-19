// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Weapon = require("../../pkg/catchfish/weapon");


// 闪电鱼武器
class LightWeapon extends Weapon {
    pkgTypeId = LightWeapon.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 113;
}

module.exports = LightWeapon;
