// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Cannon = require("../../pkg/catchfish/cannon");


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
