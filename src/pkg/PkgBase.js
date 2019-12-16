// @flow

const Tools = require("./Tools")
const { Buffer } = require("../msg/Buffer")

const DataType = Object.freeze({
    INT8: Symbol("INT8"),
    INT16: Symbol("INT16"),
    INT32: Symbol("INT32"),
    INT64: Symbol("INT64"),
    FLOAT: Symbol("FLOAT"),
    DOUBLE: Symbol("DOUBLE"),
    STRING: Symbol("STRING"),
    LIST: Symbol("LIST"),
    LIST_INT32: Symbol("LIST_INT32"),
    OBJ: Symbol("OBJ"),
    XX_RANDOM: Symbol("XX_RANDOM"),
});

class PkgBase {
    typeId = 0;
    datas = [
    ];

    getValue(key: string): Object {
        // $FlowFixMe  
        return this[key];
    }

    setValue(key: String, value: any) {
        // $FlowFixMe  
        this[key] = value;
    }

    decode(buffer: Buffer, createFunc: Function) {
        // buffer = new Buffer()
        for (const { type, key } of this.datas) {
            // console.log(key);
            switch (type) {
                case DataType.INT8: {
                    this.setValue(key, buffer.readVarintInt8());
                }
                break;
                case DataType.INT16: {
                    this.setValue(key, buffer.readVarintInt16());
                }
                break;
                case DataType.INT32: {
                    this.setValue(key, buffer.readVarintInt32());
                }
                break;
                case DataType.INT64: {
                    this.setValue(key, buffer.readVarintInt64());
                }
                break;
                case DataType.XX_RANDOM: {

                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt32(false);
                    console.log(`random.id=${typeId}, idx=${idx}`);
                    this.setValue(key, buffer.readRandom());
                }
                break;
                case DataType.LIST: {
                    const list = this.getValue(key);
                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt32(false);
                    const len = buffer.readVarintInt32(false);
                    console.log(`key:${key}, typeId: ${typeId}, idx: ${idx}, len:${len}`);
                    for (let i = 0; i < len; ++i) {
                        // console.log(i, len);
                        const obj = createFunc();
                        if (obj == null) break;
                        list.push(obj);
                    }
                }
                break;
                case DataType.LIST_INT32: {
                    const list = this.getValue(key);
                    const len = buffer.readVarintInt32(false);
                    for (let i = 0; i < len; ++i) {
                        list.push(buffer.readVarintInt32(true));
                    }
                }
                break;
                case DataType.FLOAT: {
                    this.setValue(key, buffer.readFloat());
                }
                break;
                case DataType.DOUBLE: {
                    this.setValue(key, buffer.readDouble());
                }
                break;
                case DataType.OBJ: {
                    this.setValue(key, createFunc());
                }
                break;
            }
        }
    }

    encode(buffer: Buffer, encodeFunc: Function) {
        // const view = new DataView(buffer);
        // // serial number
        // view.setUint8(idx++, 1);
        // // type id
        // view.setUint8(idx++, this.typeId);
        // // idx
        // view.setUint8(idx++, idx - 4 - 2);
        // for (const {type, key} of this.datas) {
        //     switch (type) {
        //         case DataType.INT64: {
        //             idx = Tools.WriteVarintNumber64(view, idx, this.ticks);
        //         }
        //         break;
        //     }
        // }

        // // buffer.length = idx;
        // return idx;
        for (const {type, key} of this.datas) {
            // console.log(key);
            switch (type) {
                case DataType.INT8: {
                    buffer.writeVarintInt8(this[key]);
                }
                break;
                case DataType.INT16: {
                    buffer.writeVarintInt16(this[key]);
                }
                break;
                case DataType.INT32: {
                    buffer.writeVarintInt32(this[key]);
                }
                break;
                case DataType.INT64: {
                    buffer.writeVarintInt64(this[key]);
                }
                break;
                case DataType.XX_RANDOM: {
                    buffer.writeVarintInt16(17, false);
                    // TODO
                    buffer.writeVarintInt32(buffer.getOffset(), false);
                    buffer.writeRandom(this[key]);
                }
                break;
                case DataType.LIST: {
                    const list = this.getValue(key);
                    buffer.writeVarintInt32(list.length, false);
                    for (let i = 0; i < list.length; ++i) {
                        encodeFunc(list[i]);
                        // console.log(i, len);
                        // const obj = createFunc(buffer);
                        // if (obj == null) break;
                        // list.push(obj);
                    }
                }
                break;
                case DataType.LIST_INT32: {
                    const list = this.getValue(key);
                    buffer.writeVarintInt32(list.length, false);
                    for (let i = 0; i < list.length; ++i) {
                        buffer.writeVarintInt32(list[i]);
                    }
                }
                break;
                case DataType.FLOAT: {
                    buffer.writeFloat(this[key]);
                }
                break;
                case DataType.DOUBLE: {
                    buffer.writeDouble(this[key]);
                }
                break;
                case DataType.OBJ: {
                    encodeFunc(this[key]);
                    // this[key] = createFunc(buffer);
                }
                break;
            }
        }
    }
}

module.exports = {
    PkgBase: PkgBase,
    DataType: DataType,
}
