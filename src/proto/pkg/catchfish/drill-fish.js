// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const ColorFish = require("../../pkg/catchfish/color-fish");


// 钻头鱼( 蓝 )
class DrillFish extends ColorFish {
    typeId = DrillFish.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 98;

}

module.exports = DrillFish;
