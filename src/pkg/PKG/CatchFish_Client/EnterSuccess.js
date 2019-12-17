﻿// @flow

const { PkgBase, DataType } = require("../../PkgBase");

const PKG__CatchFish__Scene = require("../../PKG/CatchFish/Scene");
const PKG__CatchFish__Player = require("../../PKG/CatchFish/Player");

// 申请进入游戏 成功
class EnterSuccess extends PkgBase {
    typeId = EnterSuccess.typeId;

    // 完整的游戏场景
    // PKG::CatchFish::Scene_s
    scene: PKG__CatchFish__Scene;
    // 玩家强引用容器
    // xx::List_s<PKG::CatchFish::Player_s>
    players: PKG__CatchFish__Player[] = [];
    // 指向当前玩家
    // std::weak_ptr<PKG::CatchFish::Player>
    self: PKG__CatchFish__Player;
    // 当前 token( 为简化设计先放这. 正常情况下是前置服务告知 )
    // std::string_s
    token: string = "";

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.OBJ,
                key: 'scene',
            },
            {
                type: DataType.LIST,
                key: 'players',
            },
            {
                type: DataType.OBJ,
                key: 'self',
            },
            {
                type: DataType.STRING,
                key: 'token',
            },
        );
    }

    static typeId = 7;

}

module.exports = EnterSuccess;
