// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Fish = require("../../pkg/catchfish/fish");

const PKG__CatchFish__RoundFish = require("../../pkg/catchfish/round-fish");

// 一只大鱼, 身边围了几只小鱼. 分摊伤害. 随机直线慢移. 自动再生. 切换关卡时快速逃离
class BigFish extends Fish {
    typeId = BigFish.typeId;

    // 围在身边的小鱼( Update, HitCheck 时级联处理 )
    // xx::List_s<PKG::CatchFish::RoundFish_s>
    childs: PKG__CatchFish__RoundFish[] = [];

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.LIST,
                key: 'childs',
            },
        );
    }

    static typeId = 83;

}

module.exports = BigFish;
