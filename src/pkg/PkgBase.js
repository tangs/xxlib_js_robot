const Tools = require("./Tools")
const Buffer = require("../msg/Buffer")

const DataType = Object.freeze({
    INT8: Symbol("INT8"),
    INT16: Symbol("INT16"),
    INT32: Symbol("INT32"),
    INT64: Symbol("INT64"),
    STRING: Symbol("STRING"),
    LIST: Symbol("LIST"),
    OBJ: Symbol("OBJ"),
});

class PkgBase {
    typeId = 0;
    datas = [
    ];

    // decode(buffer) {
    //     const view = new DataView(buffer);
    //     let idx = 4;
    //     const serialNum = view.getUint8(idx++);
    //     this.typeId = view.getUint8(idx++);
    //     ++idx; // idx

    //     // [this.ticks, idx] = Tools.ReadZigZagNumber64(view, idx, false)
    //     for (const {type, key} of this.datas) {
    //         console.log(key);
    //         switch (type) {
    //             case DataType.INT64: {
    //                 [this[key], idx] = Tools.ReadZigZagNumber64(view, idx);
    //             }
    //             break;
    //         }
    //     }
    //     return idx;
    // }

    decode(buffer) {
        // const view = new DataView(buffer);
        // let idx = 4;
        // const serialNum = view.getUint8(idx++);
        // this.typeId = view.getUint8(idx++);
        // ++idx; // idx



        // [this.ticks, idx] = Tools.ReadZigZagNumber64(view, idx, false)
        for (const {type, key} of this.datas) {
            console.log(key);
            switch (type) {
                case DataType.INT8: {
                    this[key] = buffer.readZigzagInt8();
                }
                break;
                case DataType.INT16: {
                    this[key] = buffer.readZigzagInt16();
                }
                break;
                case DataType.INT32: {
                    this[key] = buffer.readZigzagInt32();
                }
                break;
                case DataType.INT64: {
                    // [this[key], idx] = Tools.ReadZigZagNumber64(view, idx);
                    this[key] = buffer.readZigzagInt64();
                }
                break;
            }
        }
        // return idx;
    }

    encode(buffer, idx) {
        // const buffer = new ArrayBuffer(16);
        // const buffer = new Uint8Array(16);
        const view = new DataView(buffer);
        // let idx = 0;
        // serial number
        view.setUint8(idx++, 1);
        // type id
        view.setUint8(idx++, this.typeId);
        // idx
        view.setUint8(idx++, idx - 4 - 2);

        // idx = Tools.WriteZigZagNumber64(view, idx, this.ticks, false);
        // view.setUint32(0, idx - 4, true);
        for (const {type, key} of this.datas) {
            switch (type) {
                case DataType.INT64: {
                    idx = Tools.WriteZigZagNumber64(view, idx, this.ticks);
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
