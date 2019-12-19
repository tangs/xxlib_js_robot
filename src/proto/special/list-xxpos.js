// @flow

const { PkgBase, DataType } = require("../pkg-base");

// 小鱼环绕的大鱼的特殊配置
class ListXXPos extends PkgBase {
    pkgTypeId = ListXXPos.pkgTypeId;

    // 每帧移动距离
    // XXPos[]
    positions: [] = [];

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.LIST_POS,
                key: 'positions',
            },
        );
    }

    static pkgTypeId = 66;
}

module.exports = ListXXPos;
