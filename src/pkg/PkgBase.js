const Tools = require("./Tools")
const Buffer = require("../msg/Buffer")

const DataType = Object.freeze({
    INT8: Symbol("INT8"),
    INT16: Symbol("INT16"),
    INT32: Symbol("INT32"),
    INT64: Symbol("INT64"),
    FLOAT: Symbol("FLOAT"),
    STRING: Symbol("STRING"),
    LIST: Symbol("LIST"),
    OBJ: Symbol("OBJ"),
});

class PkgBase {
    typeId = 0;
    datas = [
    ];

    decode(buffer, createFunc) {
        for (const {type, key} of this.datas) {
            // console.log(key);
            switch (type) {
                case DataType.INT8: {
                    this[key] = buffer.readVarintInt8();
                }
                break;
                case DataType.INT16: {
                    this[key] = buffer.readVarintInt16();
                }
                break;
                case DataType.INT32: {
                    this[key] = buffer.readVarintInt32();
                }
                break;
                case DataType.INT64: {
                    this[key] = buffer.readVarintInt64();
                }
                break;
                case DataType.LIST: {
                    const list = this[key];
                    const len = buffer.readVarintInt32(false);
                    for (let i = 0; i < len; ++i) {
                        console.log(i, len);
                        const obj = createFunc(buffer);
                        if (obj == null) break;
                        list.push(obj);
                    }
                }
                break;
                case DataType.FLOAT: {
                    this[key] = buffer.readFloat();
                }
                break;
                case DataType.OBJ: {
                    this[key] = createFunc(buffer);
                }
                break;
            }
        }
    }

    encode(buffer, idx) {
        const view = new DataView(buffer);
        // serial number
        view.setUint8(idx++, 1);
        // type id
        view.setUint8(idx++, this.typeId);
        // idx
        view.setUint8(idx++, idx - 4 - 2);
        for (const {type, key} of this.datas) {
            switch (type) {
                case DataType.INT64: {
                    idx = Tools.WriteVarintNumber64(view, idx, this.ticks);
                }
                break;
            }
        }

        // buffer.length = idx;
        return idx;
    }
}

module.exports = {
    PkgBase: PkgBase,
    DataType: DataType,
}
