// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");


// 场景元素的共通基类
class Item extends PkgBase {
    pkgTypeId = Item.pkgTypeId;

    // 标识码
    // int32_t
    id: number = 0;
    // 位于容器时的下标 ( 用于快速交换删除. 部分类型不一定用到 )
    // int32_t
    indexAtContainer: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'id',
            },
            {
                type: DataType.INT32,
                key: 'indexAtContainer',
            },
        );
    }

    static pkgTypeId = 21;
}

module.exports = Item;
