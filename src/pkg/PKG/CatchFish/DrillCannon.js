// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Cannon = require("../../PKG/CatchFish/Cannon");

// 钻头炮台
class DrillCannon extends Cannon {
    typeId = DrillCannon.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 103;

}

module.exports = DrillCannon;
