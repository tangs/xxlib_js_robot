﻿// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");

const PKG__CatchFish__Stages__StageElement = require("../../../pkg/catchfish/stages/stage-element");

// 游戏关卡. 一切元素皆使用 Stage.ticks 来计算时间. 可弱引用 Stage 本身. 需要可以干净序列化
class Stage extends PkgBase {
    pkgTypeId = Stage.pkgTypeId;

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
    elements: XXList<PKG__CatchFish__Stages__StageElement>;
    // 监视器集合, 服务端专用
    // xx::List_s<PKG::CatchFish::Stages::StageElement_s>
    monitors: XXList<PKG__CatchFish__Stages__StageElement>;

    constructor() {
        super();
        this.pkgDatasType.push(
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

    static pkgTypeId = 24;
}

module.exports = Stage;
