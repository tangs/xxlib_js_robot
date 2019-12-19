// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Cannon = require("../../pkg/catchfish/cannon");


// 狂暴炮台
class FuryCannon extends Cannon {
    pkgTypeId = FuryCannon.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 102;
}

module.exports = FuryCannon;
