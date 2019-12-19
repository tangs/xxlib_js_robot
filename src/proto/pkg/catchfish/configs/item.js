// @flow

const { PkgBase, DataType } = require("../../../pkg-base");

const PKG__CatchFish__Configs__SpriteFrame = require("../../../pkg/catchfish/configs/sprite-frame");

// 配置基类
class Item extends PkgBase {
    pkgTypeId = Item.pkgTypeId;

    // 内部编号. 通常等同于所在容器下标
    // int32_t
    id: number = 0;
    // 放大系数( 影响各种判定, 坐标计算 )
    // float
    scale: number = 0.0;
    // 初始z轴( 部分 boss 可能临时改变自己的 z )
    // int32_t
    zOrder: number = 0;
    // 帧集合 ( 用于贴图动态加载 / 卸载管理. 派生类所有帧都应该在此放一份 )
    // xx::List_s<PKG::CatchFish::Configs::SpriteFrame_s>
    frames: PKG__CatchFish__Configs__SpriteFrame[] = [];

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'id',
            },
            {
                type: DataType.FLOAT,
                key: 'scale',
            },
            {
                type: DataType.INT32,
                key: 'zOrder',
            },
            {
                type: DataType.LIST,
                key: 'frames',
            },
        );
    }

    static pkgTypeId = 67;
}

module.exports = Item;
