// @flow

const { PkgBase, DataType } = require("../../../pkg-base");
const Cannon = require("../../../pkg/catchfish/configs/cannon");


// 钻头炮台( 穿刺 )
class DrillCannon extends Cannon {
    pkgTypeId = DrillCannon.pkgTypeId;

    // 碰撞CD: 限定一定时间范围内，子弹与鱼的碰撞检测次数。需要在子弹上背负 fishId : timeoutFN 白名单. 超时时间 = scene.FN + hitCD. 目标鱼不在名单内或 timeoutFN >= scene.FN 则可进行 hit. 同时记录到名单或刷新 timeoutFN
    // int32_t
    hitCD: number = 0;
    // 打击次数( 每次碰撞执行的 hit 次数. 消耗子弹相应的 coin. 如果剩余 coin 耗尽则消失 )
    // int32_t
    hitCount: number = 0;

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.INT32,
                key: 'hitCD',
            },
            {
                type: DataType.INT32,
                key: 'hitCount',
            },
        );
    }

    static pkgTypeId = 107;
}

module.exports = DrillCannon;
