// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Weapon = require("../../PKG/CatchFish/Weapon");

// 闪电鱼武器
class LightWeapon extends Weapon {
    typeId = LightWeapon.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 113;

}

module.exports = LightWeapon;
