// @flow

const Tools = require("./tools")
const { Buffer } = require("../msg/buffer")

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
    LIST_WAY_POINT: Symbol("LIST_WAY_POINT"),
    OBJ: Symbol("OBJ"),
    XX_RANDOM: Symbol("XX_RANDOM"),
    XX_POS: Symbol("XX_POS"),
    xx_LIST_SITS: Symbol("xx_LIST_SITS"),
});

class PkgBase {
    typeId = 0;
    datas = [
    ];

    #getValue = (key: string): any => {
        // $FlowFixMe  
        return this[key];
    }

    #setValue = (key: String, value: any) => {
        // $FlowFixMe  
        this[key] = value;
    }

    decode(buffer: Buffer, createFunc: Function) {
        // buffer = new Buffer()
        for (const { type, key } of this.datas) {
            // console.log(key);
            switch (type) {
                case DataType.INT8: {
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readVarintInt8());
                }
                break;
                case DataType.INT16: {
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readVarintInt16());
                }
                break;
                case DataType.INT32: {
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readVarintInt32());
                }
                break;
                case DataType.INT64: {
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readVarintInt64());
                }
                break;
                case DataType.FLOAT: {
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readFloat());
                }
                break;
                case DataType.DOUBLE: {
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readDouble());
                }
                break;
                case DataType.STRING: {
                    const typeId = buffer.readVarintInt16(false);
                    if (typeId != 1) return -1;
                    const idx = buffer.readVarintInt32(false);
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readString());
                }
                break;
                case DataType.LIST: {
                    // $FlowFixMe  
                    const list = this.#getValue(key);
                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt32(false);
                    const len = buffer.readVarintInt32(false);
                    // console.log(`key:${key}, typeId: ${typeId}, idx: ${idx}, len:${len}`);
                    for (let i = 0; i < len; ++i) {
                        const obj = createFunc();
                        if (obj == null) break;
                        list.push(obj);
                    }
                }
                break;
                case DataType.LIST_INT32: {
                    // TODO
                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt32(false);
                    // $FlowFixMe  
                    const list = this.#getValue(key);
                    const len = buffer.readVarintInt32(false);
                    for (let i = 0; i < len; ++i) {
                        list.push(buffer.readVarintInt32(true));
                    }
                }
                break;
                case DataType.LIST_WAY_POINT: {
                    // TODO
                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt32(false);
                    // $FlowFixMe  
                    const list = this.#getValue(key);
                    const len = buffer.readVarintInt32(false);
                    for (let i = 0; i < len; ++i) {
                        const obj = {};
                        obj.pos = {};
                        obj.pos.x = buffer.readFloat();
                        obj.pos.y = buffer.readFloat();
                        obj.angle = buffer.readFloat();
                        obj.distance = buffer.readFloat();
                        list.push(obj);
                    }
                }
                break;
                case DataType.OBJ: {
                    if (key == "way")
                        console.log(`new obj,key=${key}`);
                        // $FlowFixMe  
                    this.#setValue(key, createFunc());
                }
                break;
                case DataType.XX_RANDOM: {
                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt32(false);
                    console.log(`random.id=${typeId}, idx=${idx}`);
                    // $FlowFixMe  
                    this.#setValue(key, buffer.readRandom());
                }
                break;
                case DataType.XX_POS: {
                    const x = buffer.readFloat();
                    const y = buffer.readFloat();
                    // $FlowFixMe  
                    this.#setValue(key, {
                        x: x,
                        y: y,
                    });
                }
                break;
                case DataType.xx_LIST_SITS: {
                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt32(false);
                    const len = buffer.readVarintInt32(false);
                    // $FlowFixMe  
                    const list = this.#getValue(key);
                    // console.log(`key:${key}, typeId: ${typeId}, idx: ${idx}, len:${len}`);
                    for (let i = 0; i < len; ++i) {
                        list.push(buffer.readVarintInt32(true));
                    }
                }
                break;
                default:
                    
            }
        }
    }

    encode(buffer: Buffer, encodeFunc: Function) {
        for (const {type, key} of this.datas) {
            // console.log(key);
            switch (type) {
                case DataType.INT8: {
                    // $FlowFixMe  
                    buffer.writeVarintInt8(this.#getValue(key));
                }
                break;
                case DataType.INT16: {
                    // $FlowFixMe  
                    buffer.writeVarintInt16(this.#getValue(key));
                }
                break;
                case DataType.INT32: {
                    // $FlowFixMe  
                    buffer.writeVarintInt32(this.#getValue(key));
                }
                break;
                case DataType.INT64: {
                    // $FlowFixMe  
                    buffer.writeVarintInt64(this.#getValue(key));
                }
                break;
                case DataType.STRING: {
                    // string typeid = 1
                    buffer.writeVarintInt16(1, false);
                    buffer.writeVarintInt32(buffer.getOffset() - 5, false);
                    // $FlowFixMe  
                    buffer.writeString(this.#getValue(key));
                    // const idx = buffer.readVarintInt32(false);
                    // this.#setValue(key, buffer.readString());
                }
                break;
                case DataType.LIST: {
                    // $FlowFixMe  
                    const list = this.#getValue(key);
                    buffer.writeVarintInt32(list.length, false);
                    for (let i = 0; i < list.length; ++i) {
                        encodeFunc(list[i]);
                    }
                }
                break;
                case DataType.LIST_INT32: {
                    // TODO
                    buffer.writeVarintInt16(1, false);
                    buffer.writeVarintInt32(buffer.getOffset() - 5, false);
                    // $FlowFixMe  
                    const list = this.#getValue(key);
                    buffer.writeVarintInt32(list.length, false);
                    for (let i = 0; i < list.length; ++i) {
                        buffer.writeVarintInt32(list[i]);
                    }
                }
                break;
                case DataType.LIST_WAY_POINT: {
                    // TODO
                    buffer.writeVarintInt16(1, false);
                    buffer.writeVarintInt32(buffer.getOffset() - 5, false);
                    // $FlowFixMe  
                    const list = this.#getValue(key);
                    buffer.writeVarintInt32(list.length, false);
                    for (let i = 0; i < list.length; ++i) {
                        const obj = list[i];
                        buffer.writeFloat(obj.pos.x);
                        buffer.writeFloat(obj.pos.y);
                        buffer.writeFloat(obj.angle);
                        buffer.writeFloat(obj.distance);
                    }
                }
                break;
                case DataType.FLOAT: {
                    // $FlowFixMe  
                    buffer.writeFloat(this.#getValue(key));
                }
                break;
                case DataType.DOUBLE: {
                    // $FlowFixMe  
                    buffer.writeDouble(this.#getValue(key));
                }
                break;
                case DataType.OBJ: {
                    // $FlowFixMe  
                    encodeFunc(this.#getValue(key));
                    // this.#getValue(key) = createFunc(buffer);
                }
                break;
                case DataType.XX_RANDOM: {
                    buffer.writeVarintInt16(17, false);
                    // TODO
                    buffer.writeVarintInt32(buffer.getOffset(), false);
                    // $FlowFixMe  
                    buffer.writeRandom(this.#getValue(key));
                }
                break;
                case DataType.XX_POS: {
                    // $FlowFixMe  
                    const value = this.#getValue(key);
                    buffer.writeFloat(value.x);
                    buffer.writeFloat(value.y);
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
