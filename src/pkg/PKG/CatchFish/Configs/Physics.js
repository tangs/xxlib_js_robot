// @flow

const { PkgBase, DataType } = require("../../../pkg-base");


// 物理建模 for 鱼与子弹碰撞检测
class Physics extends PkgBase {
    typeId = Physics.typeId;

    // 基于当前帧图的多边形碰撞顶点包围区( 由多个凸多边形组合而成, 用于物理建模碰撞判定 )
    // xx::List_s<xx::List_s<::xx::Pos>>
    polygons: [] = [];

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.LIST,
                key: 'polygons',
            },
        );
    }

    static typeId = 72;

}

module.exports = Physics;
