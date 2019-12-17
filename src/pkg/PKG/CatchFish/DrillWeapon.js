// @flow

const { PkgBase, DataType } = require("../../PkgBase");

const Weapon = require("../../PKG/CatchFish/Weapon");

// 钻头鱼武器
class DrillWeapon extends Weapon {
    typeId = DrillWeapon.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 112;

}

module.exports = DrillWeapon;
