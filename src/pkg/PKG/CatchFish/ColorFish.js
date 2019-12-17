﻿// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Fish = require("../../PKG/CatchFish/Fish");

// 色彩覆盖鱼, 打死后可能爆炸或得到某种武器/炮台. 切换炮台可能导致倍率基数发生变化( 如果支持倍率切换的话 )
class ColorFish extends Fish {
    typeId = ColorFish.typeId;

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 95;

}

module.exports = ColorFish;