// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 开火
class Fire extends PkgBase {
    typeId = Fire.typeId;

    // int32_t
    frameNumber: number = 0;
    // int32_t
    cannonId: number = 0;
    // int32_t
    bulletId: number = 0;
    // float
    angle: number = 0.0;

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
