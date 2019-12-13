const Event = require("../Event")
const { PkgBase, DataType } = require("../../../PkgBase")

class CloseAutoLock extends Event {
    typeId = CloseAutoLock.typeId;

    constructor() {
        super();
    }
}

CloseAutoLock.typeId = 47;

module.exports = CloseAutoLock;
