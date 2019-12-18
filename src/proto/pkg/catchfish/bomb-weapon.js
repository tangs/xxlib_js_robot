// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Weapon = require("../../pkg/catchfish/weapon");


// 炸弹鱼武器
class BombWeapon extends Weapon {
    typeId = BombWeapon.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 110;

}

module.exports = BombWeapon;
