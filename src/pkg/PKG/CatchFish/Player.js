// @flow

const { PkgBase, DataType } = require("../../PkgBase");
const Item = require("../../PKG/CatchFish/Item");

// 玩家 ( 存在于服务 players 容器. 被 Scene.players 弱引用 )
class Player extends Item {
    typeId = Player.typeId;

    props: {}  = {
        // 昵称 用于客户端显示 ( 填充自 db )
        // std::string_s
        nickname: "",
        // 头像id 用于客户端显示 ( 填充自 db )
        // int32_t
        avatar_id: 0,
        // 破产标识 ( 每帧检测一次总资产是否为 0, 是就标记之. 总资产包括 coin, 已爆出的 weapons, 已获得的附加炮台, 飞行中的 bullets )
        // bool
        noMoney: false,
        // 剩余金币值( 不代表玩家总资产 ). 当玩家进入到游戏时, 该值填充 money * exchangeCoinRatio. 玩家退出时, 做除法还原为 money.
        // int64_t
        // $FlowFixMe
        coin: BigInt(0),
        // 座位
        // PKG::CatchFish::Sits
        sit: 0,
        // 自动锁定状态
        // bool
        autoLock: false,
        // 自动开火状态
        // bool
        autoFire: false,
        // 锁定瞄准的鱼
        // std::weak_ptr<PKG::CatchFish::Fish>
        aimFish: null,
        // 自增id ( 从 1 开始, 用于填充 炮台, 子弹 id )
        // int32_t
        autoIncId: 0,
        // 炮台堆栈 ( 例如: 常规炮 打到 钻头, 钻头飞向玩家变为 钻头炮, 覆盖在常规炮上 )
        // xx::List_s<PKG::CatchFish::Cannon_s>
        cannons: [],
        // 武器集合 ( 被打死的特殊鱼转为武器对象, 飞向玩家, 变炮消失前都在这里 )
        // xx::List_s<PKG::CatchFish::Weapon_s>
        weapons: [],
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.STRING,
                key: 'nickname',
            },
            {
                type: DataType.INT32,
                key: 'avatar_id',
            },
            {
                type: DataType.INT8,
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
                type: DataType.INT8,
                key: 'autoLock',
            },
            {
                type: DataType.INT8,
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

    static typeId = 10;

}

module.exports = Player;
