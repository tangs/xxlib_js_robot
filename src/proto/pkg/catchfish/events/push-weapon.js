// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Event = require("../../../pkg/catchfish/events/event");

const PKG__CatchFish__Weapon = require("../../../pkg/catchfish/weapon");

// 通知: 下发已生效 Weapon, 需要判断 beginFrameNumber, 放入 player.weapon 队列, 令 fishId 的鱼死掉
class PushWeapon extends Event {
    pkgTypeId = PushWeapon.pkgTypeId;

    // 死鱼id
    // int32_t
    fishId: number = 0;
    // 已于 server 端构造好的, 无牵挂的, 能干净下发的实例
    // PKG::CatchFish::Weapon_s
    weapon: PKG__CatchFish__Weapon;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'fishId',
            },
            {
                type: DataType.OBJ,
                key: 'weapon',
            },
        );
    }

    static pkgTypeId = 43;
}

module.exports = PushWeapon;
