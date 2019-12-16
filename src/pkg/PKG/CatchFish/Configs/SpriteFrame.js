// @flow

const { PkgBase, DataType } = require("../../../PkgBase");

// 精灵帧
class SpriteFrame extends PkgBase {
    typeId = SpriteFrame.typeId;
    // plist资源名
    // std::string_s
    plistName: string = "";
    // 帧名
    // std::string_s
    frameName: string = "";

    constructor() {
        super();
        this.datas.push(
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

    static typeId = 69;

}

module.exports = SpriteFrame;
