// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Cannon = require("../../pkg/catchfish/cannon");


// 狂暴炮台
class FuryCannon extends Cannon {
    typeId = FuryCannon.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 102;

}

module.exports = FuryCannon;
