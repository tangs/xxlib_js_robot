﻿// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Item = require("../../../PKG/CatchFish/Configs/Item");

// 炮台 & 子弹配置基类
class Cannon extends Item {
    typeId = Cannon.typeId;

    props: {}  = {
        // 初始角度
        // float
        angle: 0.0,
        // 炮管长度
        // float
        muzzleLen: 0.0,
        // 拥有的数量( -1: 无限 )
        // int32_t
        quantity: 0,
        // 同屏颗数限制 ( 到达上限就不允许继续发射 )
        // int32_t
        numLimit: 0,
        // 发射间隔帧数
        // int32_t
        fireCD: 0,
        // 子弹检测半径
        // int32_t
        radius: 0,
        // 子弹最大 / 显示半径
        // int32_t
        maxRadius: 0,
        // 子弹每帧前进距离
        // float
        distance: 0.0,
        // 是否开启子弹到屏幕边缘时反弹, false: 不反弹, true: 反弹
        // bool
        enableBulletBounce: false,
    };

    constructor() {
        super();
        this.datas.push(
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
                type: DataType.INT8,
                key: 'enableBulletBounce',
            },
        );
    }

    static typeId = 62;

}

module.exports = Cannon;
