// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 转发: 玩家自动开火
class OpenAutoFire extends Event {
    pkgTypeId = OpenAutoFire.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 48;
}

module.exports = OpenAutoFire;
