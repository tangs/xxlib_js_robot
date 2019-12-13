
const { PkgBase, DataType } = require("./PkgBase")

class List_Int32 extends PkgBase {
    typeId = List_Int32.typeId;
    values = [];

    constructor() {
        super();
        this.datas.push({
            type: DataType.LIST_INT32,
            key: 'values',
        });
    }
}

List_Int32.typeId = 54;

module.exports = List_Int32;
