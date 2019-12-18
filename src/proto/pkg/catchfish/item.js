// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 场景元素的共通基类
class Item extends PkgBase {
    typeId = Item.typeId;

    // 标识码
    // int32_t
    id: number = 0;
    // 位于容器时的下标 ( 用于快速交换删除. 部分类型不一定用到 )
    // int32_t
    indexAtContainer: number = 0;

    constructor() {
        super();
        this.datas.push(
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

    static typeId = 21;

}

module.exports = Item;
