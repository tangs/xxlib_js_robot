// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Cannon = require("../../pkg/catchfish/cannon");


// 钻头炮台
class DrillCannon extends Cannon {
    pkgTypeId = DrillCannon.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 103;
}

module.exports = DrillCannon;
