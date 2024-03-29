﻿// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");
const Item = require("../../pkg/catchfish/item");

const PKG__CatchFish__Fish = require("../../pkg/catchfish/fish");
const PKG__CatchFish__Cannon = require("../../pkg/catchfish/cannon");
const PKG__CatchFish__Weapon = require("../../pkg/catchfish/weapon");

// 玩家 ( 存在于服务 players 容器. 被 Scene.players 弱引用 )
class Player extends Item {
    pkgTypeId = Player.pkgTypeId;

    // 昵称 用于客户端显示 ( 填充自 db )
    // std::string_s
    nickname: string = "";
    // 头像id 用于客户端显示 ( 填充自 db )
    // int32_t
    avatar_id: number = 0;
    // 破产标识 ( 每帧检测一次总资产是否为 0, 是就标记之. 总资产包括 coin, 已爆出的 weapons, 已获得的附加炮台, 飞行中的 bullets )
    // bool
    noMoney: boolean = false;
    // 剩余金币值( 不代表玩家总资产 ). 当玩家进入到游戏时, 该值填充 money * exchangeCoinRatio. 玩家退出时, 做除法还原为 money.
    // int64_t
    // $FlowFixMe
    coin: any = BigInt(0);
    // 座位
    // PKG::CatchFish::Sits
    sit: number = 0;
    // 自动锁定状态
    // bool
    autoLock: boolean = false;
    // 自动开火状态
    // bool
    autoFire: boolean = false;
    // 锁定瞄准的鱼
    // std::weak_ptr<PKG::CatchFish::Fish>
    aimFish: PKG__CatchFish__Fish;
    // 自增id ( 从 1 开始, 用于填充 炮台, 子弹 id )
    // int32_t
    autoIncId: number = 0;
    // 炮台堆栈 ( 例如: 常规炮 打到 钻头, 钻头飞向玩家变为 钻头炮, 覆盖在常规炮上 )
    // xx::List_s<PKG::CatchFish::Cannon_s>
    cannons: XXList<PKG__CatchFish__Cannon>;
    // 武器集合 ( 被打死的特殊鱼转为武器对象, 飞向玩家, 变炮消失前都在这里 )
    // xx::List_s<PKG::CatchFish::Weapon_s>
    weapons: XXList<PKG__CatchFish__Weapon>;

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
                type: DataType.BOOL,
                key: 'autoLock',
            },
            {
                type: DataType.BOOL,
                key: 'autoFire',
            },
            {
                type: DataType.OBJ,
                key: 'aimFish',
            },
            {
                type: DataType.INT32,
                key: 'autoIncId',
            },
            {
                type: DataType.LIST,
                key: 'cannons',
            },
            {
                type: DataType.LIST,
                key: 'weapons',
            },
        );
    }

    static pkgTypeId = 10;
}

module.exports = Player;
