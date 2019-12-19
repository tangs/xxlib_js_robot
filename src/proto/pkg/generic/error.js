// @flow

const { PkgBase, XXList, DataType } = require("../../pkg-base");
const XXListXXPos = require("../../special/xxlist-xxpos");
const XXPos = require("../../special/xxpos");


// 通用错误返回
class Error extends PkgBase {
    pkgTypeId = Error.pkgTypeId;

    // int64_t
    // $FlowFixMe
    number: any = BigInt(0);
    // std::string_s
    message: string = "";

    constructor() {
        super();
        this.pkgDatasType.push(
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

    static pkgTypeId = 4;
}

module.exports = Error;
