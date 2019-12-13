const Event = require("../Event")
const { PkgBase, DataType } = require("../../../PkgBase")

class OpenAutoLock extends Event {
    typeId = OpenAutoLock.typeId;

    constructor() {
        super();
    }
}

OpenAutoLock.typeId = 45;

module.exports = OpenAutoLock;
