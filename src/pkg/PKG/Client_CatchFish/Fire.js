// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 开火
class Fire extends PkgBase {
    typeId = Fire.typeId;

    props: {}  = {
        // int32_t
        frameNumber: 0,
        // int32_t
        cannonId: 0,
        // int32_t
        bulletId: 0,
        // float
        angle: 0.0,
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'frameNumber',
            },
            {
                type: DataType.INT32,
                key: 'cannonId',
            },
            {
                type: DataType.INT32,
                key: 'bulletId',
            },
            {
                type: DataType.FLOAT,
                key: 'angle',
            },
        );
    }

    static typeId = 15;

}

module.exports = Fire;
