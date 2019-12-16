// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Bullet = require("../../PKG/CatchFish/Bullet");

// 钻头子弹
class DrillBullet extends Bullet {
    typeId = DrillBullet.typeId;

}

module.exports = DrillBullet;
