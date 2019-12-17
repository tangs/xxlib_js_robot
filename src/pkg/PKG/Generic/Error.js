// @flow

const { PkgBase, DataType } = require("../../PkgBase");

// 通用错误返回
class Error extends PkgBase {
    typeId = Error.typeId;

    props: {}  = {
        // int64_t
        // $FlowFixMe
        number: BigInt(0),
        // std::string_s
        message: "",
    };

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
