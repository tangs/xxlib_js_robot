// @flow

const { PkgBase, DataType } = require("../../pkg-base");
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
