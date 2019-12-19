// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");


// 精灵帧
class SpriteFrame extends PkgBase {
    pkgTypeId = SpriteFrame.pkgTypeId;

    // plist资源名
    // std::string_s
    plistName: string = "";
    // 帧名
    // std::string_s
    frameName: string = "";

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.STRING,
                key: 'plistName',
            },
            {
                type: DataType.STRING,
                key: 'frameName',
            },
        );
    }

    static pkgTypeId = 69;
}

module.exports = SpriteFrame;
