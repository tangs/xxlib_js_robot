// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 路径. 预约下发安全, 将复制路径完整数据
class Way extends PkgBase {
    typeId = Way.typeId;

    props: {}  = {
        // 路点集合
        // xx::List_s<PKG::CatchFish::WayPoint>
        points: [],
        // 总距离长度( sum( points[all].distance ). 如果非循环线, 不包含最后一个点的距离值. )
        // float
        distance: 0.0,
        // 是否循环( 即移动到最后一个点之后又到第 1 个点, 永远走不完
        // bool
        loop: false,
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.LIST,
                key: 'points',
            },
            {
                type: DataType.FLOAT,
                key: 'distance',
            },
            {
                type: DataType.INT8,
                key: 'loop',
            },
        );
    }

    static typeId = 34;

}

module.exports = Way;
