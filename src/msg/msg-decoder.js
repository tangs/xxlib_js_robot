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

    _decodeObj = (creatCb: Function) => {
        const buffer = this.buffer;
        const pkgId = buffer.readVarintInt16(false);

        if (pkgId == 0) {
            return null;
        }

        const cacheIdx = buffer.readVarintInt32(false);
        const destObj = buffer.findObjInCache(cacheIdx);
        if (destObj) {
            return destObj;
        } 

        if (pkgId == 1) {
            const ret = buffer.readString();
            buffer.cacheObj(cacheIdx, ret);
            return ret;
        }

        console.log(`pkgId: ${pkgId}`);

        const obj = creatCb(cacheIdx, pkgId);
        if (obj == null) {
            assert(`can't find pkg id:${pkgId}.`);
            console.log(`can't find pkg id:${pkgId}.`);
            return;
        }
        buffer.cacheObj(cacheIdx, obj);
        return obj;
    }

    _createList = (key: string, createItemCb: Function) => {
        return this._decodeObj((cacheIdx: number, pkgId: number) => {
            const buffer = this.buffer;
            const list: XXList<any> = new XXList();
            list.pkgTypeId = pkgId;
            const arr = list.arr;
            const len = buffer.readVarintInt32(false);
            for (let i = 0; i < len; ++i) {
                const obj = createItemCb();
                if (obj == null) continue;
                arr.push(obj);
            }
            return list;
        });
    }

    _createPkg = () => {
        return this._decodeObj((cacheIdx: number, pkgId: number) => {
            if (!this.pkgMap.has(pkgId)) {
                return;
            }
            const buffer = this.buffer;
            const class1: any = this.pkgMap.get(pkgId);
            const obj = new class1();
            this._decodeProps(buffer, obj);
            return obj;
        });
    }

    _decodeProps = (buffer: MsgBuffer, obj: PkgBase) => {
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
                    const list = this._createList(key, () => {
                        return this._createPkg();
                    });
                    obj.setValue(key, list);
                }
                break;
                case DataType.xx_LIST_SITS: 
                case DataType.LIST_INT32: {
                    const list = this._createList(key, () => {
                        return buffer.readVarintInt32(true);
                    });
                    obj.setValue(key, list);
                }
                break;
                case DataType.LIST_WAY_POINT: {
                    const list = this._createList(key, () => {
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

    decode = (reveivedMsg: Buffer, skipHead: boolean = false): Object => {
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
