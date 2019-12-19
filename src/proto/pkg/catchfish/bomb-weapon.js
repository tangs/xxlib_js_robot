// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Weapon = require("../../pkg/catchfish/weapon");


// 炸弹鱼武器
class BombWeapon extends Weapon {
    pkgTypeId = BombWeapon.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 110;
}

module.exports = BombWeapon;
