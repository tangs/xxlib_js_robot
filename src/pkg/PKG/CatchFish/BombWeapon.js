// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Weapon = require("../../PKG/CatchFish/Weapon");

// 炸弹鱼武器
class BombWeapon extends Weapon {
    typeId = BombWeapon.typeId;

    props: {}  = {
    };

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 110;

}

module.exports = BombWeapon;
