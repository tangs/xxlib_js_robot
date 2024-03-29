﻿// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 通知: 鱼被打死
class FishDead extends Event {
    pkgTypeId = FishDead.pkgTypeId;

    // 武器id( 非 0 则鱼被 weapon 打死. 为 0 则鱼被 cannon bullet 打死 )
    // int32_t
    weaponId: number = 0;
    // 炮台id
    // int32_t
    cannonId: number = 0;
    // 子弹id
    // int32_t
    bulletId: number = 0;
    // 金币总收入( fishs.coin * bullet.coin + left bullet coin )
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);
    // 死鱼id列表
    // xx::List_s<int32_t>
    ids: XXList<number>;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'weaponId',
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
                type: DataType.INT64,
                key: 'coin',
            },
            {
                type: DataType.LIST_INT32,
                key: 'ids',
            },
        );
    }

    static pkgTypeId = 41;
}

module.exports = FishDead;
