// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Cannon = require("../../PKG/CatchFish/Cannon");

// 狂暴炮台
class FuryCannon extends Cannon {
    typeId = FuryCannon.typeId;

    props: {}  = {
    };

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 102;

}

module.exports = FuryCannon;
