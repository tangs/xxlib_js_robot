// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 通用返回
class Success extends PkgBase {
    pkgTypeId = Success.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 3;
}

module.exports = Success;
