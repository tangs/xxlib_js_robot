// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");

const PKG__CatchFish__FishBorn = require("../../../pkg/catchfish/fish-born");

// 预约: 出鱼( 需判定 beginFrameNumber ), 放入 scene.borns 队列. 用不到 playerId
class PushFish extends Event {
    pkgTypeId = PushFish.pkgTypeId;

    // 已于 server 端构造好的, 无牵挂的, 能干净下发的实例
    // PKG::CatchFish::FishBorn_s
    born: PKG__CatchFish__FishBorn;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.OBJ,
                key: 'born',
            },
        );
    }

    static pkgTypeId = 44;
}

module.exports = PushFish;
