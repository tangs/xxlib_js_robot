// @flow

const { PkgBase, DataType } = require("../../PkgBase");

const Bullet = require("../../PKG/CatchFish/Bullet");

// 钻头子弹
class DrillBullet extends Bullet {
    typeId = DrillBullet.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 101;

}

module.exports = DrillBullet;
