﻿// @flow

const { PkgBase, XXList, DataType } = require("../../../pkg-base");
const XXListXXPos = require("../../../special/xxlist-xxpos");
const XXPos = require("../../../special/xxpos");
const Event = require("../../../pkg/catchfish/events/event");


// 通知: 玩家破产
class NoMoney extends Event {
    pkgTypeId = NoMoney.pkgTypeId;


    constructor() {
        super();
        this.pkgDatasType.push(
        );
    }

    static pkgTypeId = 39;
}

module.exports = NoMoney;
