// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");


// 物理建模 for 鱼与子弹碰撞检测
class Physics extends PkgBase {
    pkgTypeId = Physics.pkgTypeId;

    // 基于当前帧图的多边形碰撞顶点包围区( 由多个凸多边形组合而成, 用于物理建模碰撞判定 )
    // xx::List_s<xx::List_s<::xx::Pos>>
    polygons: XXList<XXListXXPos>;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.LIST,
                key: 'polygons',
            },
        );
    }

    static pkgTypeId = 72;
}

module.exports = Physics;
