// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 申请进入游戏. 成功返回 EnterSuccess. 失败直接被 T
class Enter extends PkgBase {
    typeId = Enter.typeId;

    props: {}  = {
        // 传递先前保存的 token 以便断线重连. 没有传空
        // std::string_s
        token: "",
    };

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
