// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Bullet = require("../../pkg/catchfish/bullet");


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
