// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 场景
class Scene extends PkgBase {
    typeId = Scene.typeId;

    props: {}  = {
        // 游戏id
        // int32_t
        gameId: 0,
        // 级别id
        // int32_t
        levelId: 0,
        // 房间id
        // int32_t
        roomId: 0,
        // 准入金
        // double
        minMoney: 0.0,
        // 最低炮注( coin )( 针对普通炮台 )
        // int64_t
        // $FlowFixMe
        minBet: BigInt(0),
        // 最高炮注( coin )( 针对普通炮台 )
        // int64_t
        // $FlowFixMe
        maxBet: BigInt(0),
        // 加减炮注跨度( coin )( 针对普通炮台 )
        // int64_t
        // $FlowFixMe
        stepBet: BigInt(0),
        // 进出游戏时 money 自动兑换成 coin 要 乘除 的系数
        // int32_t
        exchangeCoinRatio: 0,
        // 帧编号, 每帧 + 1. 用于同步
        // int32_t
        frameNumber: 0,
        // 本地鱼生成专用随机数发生器
        // ::xx::Random_s
        rnd: null,
        // 自增id ( 从 1 开始, 用于填充 本地鱼 id )
        // int32_t
        autoIncId: 0,
        // 所有活鱼 ( 乱序 )
        // xx::List_s<PKG::CatchFish::Fish_s>
        fishs: [],
        // 所有已创建非活鱼 ( 乱序 )
        // xx::List_s<PKG::CatchFish::Item_s>
        items: [],
        // 所有鱼预约生成 ( 乱序 )
        // xx::List_s<PKG::CatchFish::FishBorn_s>
        borns: [],
        // 当前关卡. endFrameNumber 到达时切换到下一关( clone from cfg.stages[(stage.id + 1) % cfg.stages.len] 并修正 各种 frameNumber )
        // PKG::CatchFish::Stages::Stage_s
        stage: null,
        // 空闲座位下标( 初始时填入 Sits.LeftBottom RightBottom LeftTop RightTop )
        // xx::List_s<PKG::CatchFish::Sits>
        freeSits: [],
        // 所有玩家( 弱引用. 具体容器在 Scene 之外 )
        // xx::List_s<std::weak_ptr<PKG::CatchFish::Player>>
        players: [],
    };

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT32,
                key: 'gameId',
            },
            {
                type: DataType.INT32,
                key: 'levelId',
            },
            {
                type: DataType.INT32,
                key: 'roomId',
            },
            {
                type: DataType.DOUBLE,
                key: 'minMoney',
            },
            {
                type: DataType.INT64,
                key: 'minBet',
            },
            {
                type: DataType.INT64,
                key: 'maxBet',
            },
            {
                type: DataType.INT64,
                key: 'stepBet',
            },
            {
                type: DataType.INT32,
                key: 'exchangeCoinRatio',
            },
            {
                type: DataType.INT32,
                key: 'frameNumber',
            },
            {
                type: DataType.XX_RANDOM,
                key: 'rnd',
            },
            {
                type: DataType.INT32,
                key: 'autoIncId',
            },
            {
                type: DataType.LIST,
                key: 'fishs',
            },
            {
                type: DataType.LIST,
                key: 'items',
            },
            {
                type: DataType.LIST,
                key: 'borns',
            },
            {
                type: DataType.OBJ,
                key: 'stage',
            },
            {
                type: DataType.xx_LIST_SITS,
                key: 'freeSits',
            },
            {
                type: DataType.LIST,
                key: 'players',
            },
        );
    }

    static typeId = 8;

}

module.exports = Scene;
