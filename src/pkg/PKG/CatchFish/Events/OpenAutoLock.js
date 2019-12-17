// @flow

const { PkgBase, DataType } = require("../../../PkgBase");
const Event = require("../../../PKG/CatchFish/Events/Event");

// 转发: 开启开火锁定
class OpenAutoLock extends Event {
    typeId = OpenAutoLock.typeId;

    props: {}  = {
    };

    constructor() {
        super();
        this.datas.push(
        );
    }

    static typeId = 45;

}

module.exports = OpenAutoLock;
