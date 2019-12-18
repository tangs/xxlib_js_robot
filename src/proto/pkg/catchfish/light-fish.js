// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const ColorFish = require("../../pkg/catchfish/color-fish");


// 闪电鱼( 白 )
class LightFish extends ColorFish {
    typeId = LightFish.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 109;

}

module.exports = LightFish;
