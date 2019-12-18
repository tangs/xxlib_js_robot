// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Weapon = require("../../pkg/catchfish/weapon");


// 狂暴鱼武器
class FuryWeapon extends Weapon {
    typeId = FuryWeapon.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 111;

}

module.exports = FuryWeapon;
