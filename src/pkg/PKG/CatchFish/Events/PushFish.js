﻿// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 预约: 出鱼( 需判定 beginFrameNumber ), 放入 scene.borns 队列. 用不到 playerId
class PushFish extends Event {
    typeId = PushFish.typeId;

    props: {}  = {
        // 已于 server 端构造好的, 无牵挂的, 能干净下发的实例
        // PKG::CatchFish::FishBorn_s
        born: null,
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.OBJ,
                key: 'born',
            },
        );
    }

    static typeId = 44;

}

module.exports = PushFish;
