// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 通用错误返回
class Error extends PkgBase {
    typeId = Error.typeId;
    // int64_t
    // $FlowFixMe
    number: any = BigInt(0);
    // std::string_s
    message: string = "";

    constructor() {
        super();
        this.datas.push(
            {
                type: DataType.INT64,
                key: 'number',
            },
            {
                type: DataType.STRING,
                key: 'message',
            },
        );
    }

    static typeId = 4;

}

module.exports = Error;
