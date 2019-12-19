// @flow

const assert = require("assert");

const Tools = require("./tools");

const { MsgBuffer } = require("../msg/buffer");
const XXPos = require("../proto/special/xxpos");
// const { MsgDecoder } = require("../msg/msg-decoder");

const DataType = Object.freeze({
    BOOL: Symbol("BOOL"),
    UINT8: Symbol("UINT8"),
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
    LIST_POS: Symbol("LIST_POS"),
    OBJ: Symbol("OBJ"),
    XX_RANDOM: Symbol("XX_RANDOM"),
    XX_POS: Symbol("XX_POS"),
    xx_LIST_SITS: Symbol("xx_LIST_SITS"),
});

class PkgBase {
    pkgTypeId = 0;
    pkgDatasType = [
    ];

    getValue = (key: string): any => {
        // $FlowFixMe
        return this[key];
    }

    setValue = (key: string, value: any) => {
        // $FlowFixMe
        this[key] = value;
    }

    // decodeList(key: string, buffer: MsgBuffer, createFunc: Function, cb: Function) {
    //     const typeId = buffer.readVarintInt16(false);
    //     if (typeId == 0) {
    //         return;
    //     }
    //     const idx = buffer.readVarintInt32(false);

    //     const destObj = buffer.findObjInCache(idx);
    //     if (destObj) {
    //         // $FlowFixMe
    //         this.#setValue(key, destObj);
    //         return;
    //     } 

    //     // $FlowFixMe
    //     // const list = this.#getValue(key);
    //     const list: XXList = new XXList();
    //     const arr = list.arr;
    //     list.pkgTypeId = typeId;
    //     const len = buffer.readVarintInt32(false);
    //     // console.log(`key:${key}, typeId: ${typeId}, idx: ${idx}, len:${len}`);
    //     for (let i = 0; i < len; ++i) {
    //         const obj = cb();
    //         if (obj == null) continue;
    //         arr.push(obj);
    //     }
    //     buffer.cacheObj(idx, list);
    //     // $FlowFixMe
    //     this.#setValue(key, list);
    // }

    encodeList(key: string, pkgTypeId: number, buffer: MsgBuffer, cb: Function) {
        // $FlowFixMe
        const list = this.getValue(key);
        const typeId = list == null ? 0 : pkgTypeId;
        if (typeId == 0) {
            buffer.writeVarintInt16(0, false);
            return;
        }

        const idx = buffer.getOffsetWithoutHead();

        const destObj = buffer.findObjInCache(idx);
        if (destObj) {
            // $FlowFixMe
            this.setValue(key, destObj);
            return;
        } 

        const len = buffer.readVarintInt32(false);
        // console.log(`key:${key}, typeId: ${typeId}, idx: ${idx}, len:${len}`);
        for (let i = 0; i < len; ++i) {
            const obj = cb();
            if (obj == null) continue;
            list.push(obj);
        }
        buffer.cacheObj(idx, list);
    }

    encode(buffer: MsgBuffer, encodeFunc: Function) {
        for (const {type, key} of this.pkgDatasType) {
            // console.log(key);
            switch (type) {
                case DataType.BOOL: {
                    // $FlowFixMe
                    const value = this.getValue(key) ? 1 : 0;
                    buffer.writeUInt8(value);
                }
                break;
                case DataType.UINT8: {
                    // $FlowFixMe
                    buffer.writeUInt8(this.getValue(key));
                }
                break;
                case DataType.INT8: {
                    // $FlowFixMe
                    buffer.writeVarintInt8(this.getValue(key));
                }
                break;
                case DataType.INT16: {
                    // $FlowFixMe
                    buffer.writeVarintInt16(this.getValue(key));
                }
                break;
                case DataType.INT32: {
                    // $FlowFixMe
                    buffer.writeVarintInt32(this.getValue(key));
                }
                break;
                case DataType.INT64: {
                    // $FlowFixMe
                    buffer.writeVarintInt64(this.getValue(key));
                }
                break;
                case DataType.STRING: {
                    // string typeid = 1
                    buffer.writeVarintInt16(1, false);
                    buffer.writeVarintInt32(buffer.getOffset() - 5, false);
                    // $FlowFixMe
                    buffer.writeString(this.getValue(key));
                    // const idx = buffer.readVarintInt32(false);
                    // this.#setValue(key, buffer.readString());
                }
                break;
                case DataType.LIST: {
                    buffer.writeVarintInt16(1, false);
                    // $FlowFixMe
                    const list = this.getValue(key);
                    buffer.writeVarintInt32(list.length, false);
                    for (let i = 0; i < list.length; ++i) {
                        encodeFunc(list[i]);
                    }
                }
                break;
                case DataType.LIST_POS: {
                    buffer.writeVarintInt16(1, false);
                    buffer.writeVarintInt32(buffer.getOffset() - 5, false);
                    // $FlowFixMe
                    const list = this.getValue(key);
                    buffer.writeVarintInt32(list.length, false);
                    for (let i = 0; i < list.length; ++i) {
                        const pos: XXPos = list[i];
                        // buffer.writeXXPos(list[i]);
                        buffer.writeFloat(pos.x);
                        buffer.writeFloat(pos.y);
                    }                    
                }
                break;
                case DataType.LIST_INT32: {
                    // TODO
                    buffer.writeVarintInt16(1, false);
                    buffer.writeVarintInt32(buffer.getOffset() - 5, false);
                    // $FlowFixMe
                    const list = this.getValue(key);
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
                    const list = this.getValue(key);
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
                    buffer.writeFloat(this.getValue(key));
                }
                break;
                case DataType.DOUBLE: {
                    // $FlowFixMe
                    buffer.writeDouble(this.getValue(key));
                }
                break;
                case DataType.OBJ: {
                    // $FlowFixMe
                    encodeFunc(this.getValue(key));
                    // this.getValue(key) = createFunc(buffer);
                }
                break;
                case DataType.XX_RANDOM: {
                    buffer.writeVarintInt16(17, false);
                    // TODO
                    buffer.writeVarintInt32(buffer.getOffset(), false);
                    // $FlowFixMe
                    buffer.writeRandom(this.getValue(key));
                }
                break;
                case DataType.XX_POS: {
                    // $FlowFixMe
                    // const value = this.getValue(key);
                    // buffer.writeFloat(value.x);
                    // buffer.writeFloat(value.y);
                    // $FlowFixMe
                    buffer.writeXXPos(this.getValue(key));
                }
                break;
            }
        }
    }
}

// class XXList extends PkgBase {
//     arr = [];

//     constructor() {
//         super();
//         this.pkgDatasType.push(
//             {
//                 type: DataType.LIST,
//                 key: 'arr',
//             },
//         );
//     }
// }

class XXList<T> extends PkgBase {
    arr: T[] = [];

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.LIST,
                key: 'arr',
            },
        );
    }
}

module.exports = {
    PkgBase: PkgBase,
    XXList: XXList,
    DataType: DataType,
}
