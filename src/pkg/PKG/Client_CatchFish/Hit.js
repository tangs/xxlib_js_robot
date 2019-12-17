// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 碰撞检测
class Hit extends PkgBase {
    typeId = Hit.typeId;

    props: {}  = {
        // int32_t
        cannonId: 0,
        // int32_t
        bulletId: 0,
        // int32_t
        fishId: 0,
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'cannonId',
            },
            {
                type: DataType.INT32,
                key: 'bulletId',
            },
            {
                type: DataType.INT32,
                key: 'fishId',
            },
        );
    }

    static typeId = 16;

}

module.exports = Hit;
