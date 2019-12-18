﻿// @flow

const { PkgBase, DataType } = require("../../../pkg-base");

const PKG__CatchFish__Stages__StageElement = require("../../../pkg/catchfish/stages/stage-element");

// 游戏关卡. 一切元素皆使用 Stage.ticks 来计算时间. 可弱引用 Stage 本身. 需要可以干净序列化
class Stage extends PkgBase {
    typeId = Stage.typeId;

    // 关卡 id( 通常等于下标值 )
    // int32_t
    cfg_id: number = 0;
    // 结束时间点
    // int32_t
    cfg_endTicks: number = 0;
    // 帧编号( 运行时每帧 +1 )
    // int32_t
    ticks: number = 0;
    // 元素集合
    // xx::List_s<PKG::CatchFish::Stages::StageElement_s>
    elements: PKG__CatchFish__Stages__StageElement[] = [];
    // 监视器集合, 服务端专用
    // xx::List_s<PKG::CatchFish::Stages::StageElement_s>
    monitors: PKG__CatchFish__Stages__StageElement[] = [];

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'cfg_id',
            },
            {
                type: DataType.INT32,
                key: 'cfg_endTicks',
            },
            {
                type: DataType.INT32,
                key: 'ticks',
            },
            {
                type: DataType.LIST,
                key: 'elements',
            },
            {
                type: DataType.LIST,
                key: 'monitors',
            },
        );
    }

    static typeId = 24;

}

module.exports = Stage;