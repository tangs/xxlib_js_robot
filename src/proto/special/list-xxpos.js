// @flow

const { PkgBase, DataType } = require("../pkg-base");

// 小鱼环绕的大鱼的特殊配置
class ListXXPos extends PkgBase {
    typeId = ListXXPos.typeId;

    // 每帧移动距离
    // XXPos[]
    positions: [] = [];

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.LIST_POS,
                key: 'positions',
            },
        );
    }

    static typeId = 66;

}

module.exports = ListXXPos;
