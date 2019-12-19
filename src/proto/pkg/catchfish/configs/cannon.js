// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Item = require("../../../pkg/catchfish/configs/item");


// 炮台 & 子弹配置基类
class Cannon extends Item {
    pkgTypeId = Cannon.pkgTypeId;

    // 初始角度
    // float
    angle: number = 0.0;
    // 炮管长度
    // float
    muzzleLen: number = 0.0;
    // 拥有的数量( -1: 无限 )
    // int32_t
    quantity: number = 0;
    // 同屏颗数限制 ( 到达上限就不允许继续发射 )
    // int32_t
    numLimit: number = 0;
    // 发射间隔帧数
    // int32_t
    fireCD: number = 0;
    // 子弹检测半径
    // int32_t
    radius: number = 0;
    // 子弹最大 / 显示半径
    // int32_t
    maxRadius: number = 0;
    // 子弹每帧前进距离
    // float
    distance: number = 0.0;
    // 是否开启子弹到屏幕边缘时反弹, false: 不反弹, true: 反弹
    // bool
    enableBulletBounce: boolean = false;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.FLOAT,
                key: 'angle',
            },
            {
                type: DataType.FLOAT,
                key: 'muzzleLen',
            },
            {
                type: DataType.INT32,
                key: 'quantity',
            },
            {
                type: DataType.INT32,
                key: 'numLimit',
            },
            {
                type: DataType.INT32,
                key: 'fireCD',
            },
            {
                type: DataType.INT32,
                key: 'radius',
            },
            {
                type: DataType.INT32,
                key: 'maxRadius',
            },
            {
                type: DataType.FLOAT,
                key: 'distance',
            },
            {
                type: DataType.BOOL,
                key: 'enableBulletBounce',
            },
        );
    }

    static pkgTypeId = 62;
}

module.exports = Cannon;
