const { PkgBase, DataType } = require("./PkgBase")
class Events extends PkgBase {
    typeId = Events.typeId;// int32
    children = [];

    constructor() {
        super();
        this.datas.push({
            type: DataType.LIST,
            key: 'children',
        });
    }
}

Events.typeId = 12;

module.exports = Events;