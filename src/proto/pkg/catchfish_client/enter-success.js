// @flow

const { PkgBase, DataType } = require("../../pkg-base");

const PKG__CatchFish__Scene = require("../../pkg/catchfish/scene");
const PKG__CatchFish__Player = require("../../pkg/catchfish/player");

// 申请进入游戏 成功
class EnterSuccess extends PkgBase {
    pkgTypeId = EnterSuccess.pkgTypeId;

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
        this.pkgDatasType.push(
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

    static pkgTypeId = 7;
}

module.exports = EnterSuccess;
