// @flow

const { PkgBase, DataType } = require("../../PkgBase");

const Bullet = require("../../PKG/CatchFish/Bullet");

// 狂暴子弹
class FuryBullet extends Bullet {
    typeId = FuryBullet.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 100;

}

module.exports = FuryBullet;
