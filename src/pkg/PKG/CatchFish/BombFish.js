// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const ColorFish = require("../../PKG/CatchFish/ColorFish");

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
