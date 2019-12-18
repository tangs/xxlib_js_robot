// @flow

const { PkgBase, DataType } = require("../../pkg-base");
const Fish = require("../../pkg/catchfish/fish");

const PKG__CatchFish__Way = require("../../pkg/catchfish/way");

// 基于路径移动的鱼基类
class WayFish extends Fish {
    typeId = WayFish.typeId;

    // 移动路径. 动态生成, 不引用自 cfg. 同步时被复制. 如果该值为空, 则启用 wayTypeIndex / wayIndex
    // PKG::CatchFish::Way_s
    way: PKG__CatchFish__Way;
    // cfg.ways[wayTypeIndex]
    // int32_t
    wayTypeIndex: number = 0;
    // cfg.ways[wayTypeIndex][wayIndex]
    // int32_t
    wayIndex: number = 0;
    // 当前路点下标
    // int32_t
    wayPointIndex: number = 0;
    // 当前路点上的已前进距离
    // float
    wayPointDistance: number = 0.0;
    // 是否为在路径上倒着移动( 默认否 )
    // bool
    reverse: bool = false;

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.OBJ,
                key: 'way',
            },
            {
                type: DataType.INT32,
                key: 'wayTypeIndex',
            },
            {
                type: DataType.INT32,
                key: 'wayIndex',
            },
            {
                type: DataType.INT32,
                key: 'wayPointIndex',
            },
            {
                type: DataType.FLOAT,
                key: 'wayPointDistance',
            },
            {
                type: DataType.BOOL,
                key: 'reverse',
            },
        );
    }

    static typeId = 80;

}

module.exports = WayFish;
