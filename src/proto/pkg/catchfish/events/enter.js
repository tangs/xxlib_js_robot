﻿// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 通知: 玩家进入. 大部分字段从 Player 类复制. 添加了部分初始数值, 可还原出玩家类实例.
class Enter extends Event {
    pkgTypeId = Enter.pkgTypeId;

    // 昵称
    // std::string_s
    nickname: string = "";
    // 头像id
    // int32_t
    avatar_id: number = 0;
    // 破产标识
    // bool
    noMoney: boolean = false;
    // 剩余金币值
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);
    // 座位
    // PKG::CatchFish::Sits
    sit: number = 0;
    // 炮台配置id
    // int32_t
    cannonCfgId: number = 0;
    // 炮台币值
    // int64_t
    // $FlowFixMe
    cannonCoin: any = BigInt(0);

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.STRING,
                key: 'nickname',
            },
            {
                type: DataType.INT32,
                key: 'avatar_id',
            },
            {
                type: DataType.BOOL,
                key: 'noMoney',
            },
            {
                type: DataType.INT64,
                key: 'coin',
            },
            {
                type: DataType.INT32,
                key: 'sit',
            },
            {
                type: DataType.INT32,
                key: 'cannonCfgId',
            },
            {
                type: DataType.INT64,
                key: 'cannonCoin',
            },
        );
    }

    static pkgTypeId = 37;
}

module.exports = Enter;
