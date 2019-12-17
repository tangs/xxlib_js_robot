// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 通知: 玩家进入. 大部分字段从 Player 类复制. 添加了部分初始数值, 可还原出玩家类实例.
class Enter extends Event {
    typeId = Enter.typeId;

    props: {}  = {
        // 昵称
        // std::string_s
        nickname: "",
        // 头像id
        // int32_t
        avatar_id: 0,
        // 破产标识
        // bool
        noMoney: false,
        // 剩余金币值
        // int64_t
        // $FlowFixMe
        coin: BigInt(0),
        // 座位
        // PKG::CatchFish::Sits
        sit: 0,
        // 炮台配置id
        // int32_t
        cannonCfgId: 0,
        // 炮台币值
        // int64_t
        // $FlowFixMe
        cannonCoin: BigInt(0),
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
                type: DataType.INT32,
                key: 'cannonCfgId',
            },
            {
                type: DataType.INT64,
                key: 'cannonCoin',
            },
        );
    }

    static typeId = 37;

}

module.exports = Enter;
