// @flow

const { PkgBase, DataType } = require("../../pkg-base");


// 申请进入游戏. 成功返回 EnterSuccess. 失败直接被 T
class Enter extends PkgBase {
    typeId = Enter.typeId;

    // 传递先前保存的 token 以便断线重连. 没有传空
    // std::string_s
    token: string = "";

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.STRING,
                key: 'token',
            },
        );
    }

    static typeId = 14;

}

module.exports = Enter;
