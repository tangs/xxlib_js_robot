const { PkgBase, DataType } = require("./PkgBase")
class Events extends PkgBase {
    typeId = 12;// int32
    len = 0;

    datas = [
        {
            type: DataType.INT32,
            key: 'len',
        },
    ];
}

Events.typeId = 12;

module.exports = Events;
