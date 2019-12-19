// @flow

const assert = require("assert");

const { MsgBuffer } = require("./buffer");
const { PkgBase, XXList, DataType } = require("../proto/pkg-base");

// const XXList = require("../proto/special/xxlist");
const XXlistXXPos = require("../proto/special/xxlist-xxpos");
const XXPos = require("../proto/special/xxpos");

class MsgDecoder {
    buffer: MsgBuffer = new MsgBuffer();
    pkgMap: Map<number, Function> = new Map();

    constructor() {
        require("../proto/regiser-pkgs")(this);
        this.register(XXlistXXPos);
    }

    register = (pkgClass: Object) => {
        this.pkgMap.set(pkgClass.pkgTypeId, pkgClass);
    }

    _decodeList = (key: string, cb: Function) => {
        const buffer = this.buffer;
        const typeId = buffer.readVarintInt16(false);
        if (typeId == 0) {
            return;
        }
        const idx = buffer.readVarintInt32(false);

        const destObj = buffer.findObjInCache(idx);
        if (destObj) {
            return destObj;
        } 

        const list: XXList<any> = new XXList();
        const arr = list.arr;
        // const list = [];
        list.pkgTypeId = typeId;
        const len = buffer.readVarintInt32(false);
        // console.log(`key:${key}, typeId: ${typeId}, idx: ${idx}, len:${len}`);
        for (let i = 0; i < len; ++i) {
            const obj = cb();
            if (obj == null) continue;
            arr.push(obj);
        }
        buffer.cacheObj(idx, list);
        return list;
    }

    _createPkg = (): (PkgBase | string | null) => {
        const buffer = this.buffer;
        // const buffer = this.buffer;
        const pkgId = buffer.readVarintInt16(false);

        if (pkgId == 0) {
            return null;
        }

        const idx = buffer.readVarintInt32(false);
        const destObj = buffer.findObjInCache(idx);
        if (destObj) {
            return destObj;
        } 

        if (pkgId == 1) {
            const ret = buffer.readString();
            buffer.cacheObj(idx, ret);
            return ret;
        }

        console.log(`pkgId: ${pkgId}`);

        if (this.pkgMap.has(pkgId)) {
            const class1: any = this.pkgMap.get(pkgId);
            const obj = new class1();
            buffer.cacheObj(idx, obj);
            // obj.decode(buffer, this);
            this._decodePkg(buffer, obj);
            return obj;
        } else {
            assert(`can't find pkg id:${pkgId}.`);
            console.log(`can't find pkg id:${pkgId}.`);
            return null;
        }
    }

    _decodePkg = (buffer: MsgBuffer, obj: PkgBase) => {
        // buffer = new Buffer()
        for (const { type, key } of obj.pkgDatasType) {
            // console.log(key);
            switch (type) {
                case DataType.BOOL: {
                    obj.setValue(key, buffer.readUInt8() != 0);
                }
                break;
                case DataType.UINT8: {
                    obj.setValue(key, buffer.readUInt8());
                }
                break;
                case DataType.INT8: {
                    obj.setValue(key, buffer.readInt8());
                }
                break;
                case DataType.INT16: {
                    obj.setValue(key, buffer.readVarintInt16());
                }
                break;
                case DataType.INT32: {
                    obj.setValue(key, buffer.readVarintInt32());
                }
                break;
                case DataType.INT64: {
                    obj.setValue(key, buffer.readVarintInt64());
                }
                break;
                case DataType.FLOAT: {
                    obj.setValue(key, buffer.readFloat());
                }
                break;
                case DataType.DOUBLE: {
                    obj.setValue(key, buffer.readDouble());
                }
                break;
                case DataType.LIST: {
                    const list = this._decodeList(key, () => {
                        return this._createPkg();
                    });
                    obj.setValue(key, list);
                }
                break;
                case DataType.xx_LIST_SITS: 
                case DataType.LIST_INT32: {
                    const list = this._decodeList(key, () => {
                        return buffer.readVarintInt32(true);
                    });
                    obj.setValue(key, list);
                }
                break;
                case DataType.LIST_WAY_POINT: {
                    const list = this._decodeList(key, () => {
                        const obj = {};
                        obj.pos = {};
                        obj.pos.x = buffer.readFloat();
                        obj.pos.y = buffer.readFloat();
                        obj.angle = buffer.readFloat();
                        obj.distance = buffer.readFloat();
                        return obj;
                    });
                    obj.setValue(key, list);
                }
                break;
                case DataType.LIST_POS: {
                    // 特殊处理, 这种类型list不同于其他list，这里item不需要缓存.
                    const list = obj.getValue(key);
                    const len = buffer.readVarintInt32(false);
                    for (let i = 0; i < len; ++i) {
                        list.push(new XXPos(
                            buffer.readFloat(), 
                            buffer.readFloat())
                        );
                    }
                }
                break;
                case DataType.STRING:
                case DataType.OBJ: {
                    obj.setValue(key, this._createPkg());
                }
                break;
                case DataType.XX_RANDOM: {
                    const typeId = buffer.readVarintInt16(false);
                    const idx = buffer.readVarintInt16(false);
                    console.log(`random.id=${typeId}, idx=${idx}`);
                    obj.setValue(key, buffer.readRandom());
                }
                break;
                case DataType.XX_POS: {
                    const x = buffer.readFloat();
                    const y = buffer.readFloat();
                    obj.setValue(key, new XXPos(x, y));
                }
                break;
                default:
                    assert(`undeal decode type: ${type.toString()}`);
            }
        }
    }

    decode = (reveivedMsg: Buffer, skipHead: boolean = false): (PkgBase | string | null) => {
        const bytes = reveivedMsg.buffer;
        const buffer = this.buffer;

        // init buffer
        buffer.setBuffer(bytes);
        buffer.reset();

        if (!skipHead) {
            const len = buffer.readInt32();
            // skip seral id.
            buffer.skip(1);
        }
        buffer.saveHeadOffset();

        return this._createPkg();
    }
}

module.exports = {
    MsgDecoder: MsgDecoder,
}
