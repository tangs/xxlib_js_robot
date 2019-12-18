// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 通用返回
class Success extends PkgBase {
    typeId = Success.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 3;

}

module.exports = Success;
