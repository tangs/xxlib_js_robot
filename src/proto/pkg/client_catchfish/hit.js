// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 碰撞检测
class Hit extends PkgBase {
    typeId = Hit.typeId;

    // int32_t
    cannonId: number = 0;
    // int32_t
    bulletId: number = 0;
    // int32_t
    fishId: number = 0;

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
