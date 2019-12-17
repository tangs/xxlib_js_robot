// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const ColorFish = require("../../PKG/CatchFish/ColorFish");

// 钻头鱼( 蓝 )
class DrillFish extends ColorFish {
    typeId = DrillFish.typeId;

    props: {}  = {
    };

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 98;

}

module.exports = DrillFish;
