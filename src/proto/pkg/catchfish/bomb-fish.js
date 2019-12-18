// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const ColorFish = require("../../pkg/catchfish/color-fish");


// 炸弹鱼( 红 )
class BombFish extends ColorFish {
    typeId = BombFish.typeId;


    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 96;

}

module.exports = BombFish;
