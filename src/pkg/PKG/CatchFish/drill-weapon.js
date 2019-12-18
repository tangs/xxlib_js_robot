// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Weapon = require("../../pkg/catchfish/weapon");


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
