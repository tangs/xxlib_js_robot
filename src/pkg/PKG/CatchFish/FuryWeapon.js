// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Weapon = require("../../PKG/CatchFish/Weapon");

// 狂暴鱼武器
class FuryWeapon extends Weapon {
    typeId = FuryWeapon.typeId;

    props: {}  = {
    };

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 111;

}

module.exports = FuryWeapon;
