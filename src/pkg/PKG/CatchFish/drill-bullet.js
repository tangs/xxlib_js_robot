// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Bullet = require("../../pkg/catchfish/bullet");


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
