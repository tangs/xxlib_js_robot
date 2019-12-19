// @flow

const utf8 = require('utf8');

const Tools = require("../proto/tools");
const { PkgBase, DataType } = require("../proto/pkg-base");

// **************************
// *|head|serial id|content|* 
// **************************
// head: 4 bits(content length)
// serial id: 1 or 2 bits(varint16)
class MsgBuffer {
    buffer: ArrayBuffer;
    view: DataView;
    offset: number = 0;
    length: number = 0;
    // offset without head.
    headOffset: number = 0;
    objCache: Map<number, Object> = new Map();

    setBuffer(buffer: ArrayBuffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer);
    }

    reset() {
        this.offset = 0;
        this.headOffset = 0;
        this.length = 0;
        this.objCache.clear();
    }

    skip(len: number) {
        this.offset += len;
    }

    setOffset(offset: number) {
        this.offset = offset;
    }

    getOffset() {
        return this.offset;
    }

    getUInt8Array(): Uint8Array {
        return new Uint8Array(this.buffer, 0, this.offset);
    }

    //*********** head start **************/
    saveHeadOffset() {
        this.headOffset = this.offset;
    }

    getOffsetWithoutHead() {
        return this.offset - this.headOffset;
    }

    writeLenToHead() {
        this.view.setInt32(0, this.offset - 4, true);
    }
    //*********** head end **************/

    //*********** cache start **************/
    cacheObj(key: number, obj: Object) {
        this.objCache.set(key, obj);
    }

    findObjInCache(key: number) {
        if (this.objCache.has(key)) {
            return this.objCache.get(key);
        }
    }

    findKeyInCache(obj: Object) {
        for (const [key, v] of this.objCache) {
            if (v == obj) return key;
        }
    }
    //*********** cache end **************/

    #readVarint = (bits: number, isZigzag: boolean = true) => {
        const [ret, offset] = Tools.ReadVarintNumber(this.view, this.offset, bits, isZigzag);
        this.offset = offset;
        return ret;
    }

    #writeVarint = (value: number, bits: number, isZigzag: boolean = true) => {
        this.offset = Tools.WriteVarintNumber(this.view, this.offset, value, bits, isZigzag);
    }

    readUInt8() {
        return this.view.getUint8(this.offset++);
    }

    readInt8() {
        return this.view.getInt8(this.offset++);
    }

    readInt32() {
        const ret = this.view.getInt32(this.offset, true);
        this.offset += 4;
        return ret;
    }

    // readVarintInt8(isZigzag: boolean = true) {
    //     // $FlowFixMe
    //     return this.#readVarint(1, isZigzag);
    // }

    readVarintInt16(isZigzag: boolean = true) {
        // $FlowFixMe
        return this.#readVarint(2, isZigzag);
    }

    readVarintInt32(isZigzag: boolean = true) {
        // $FlowFixMe
        return this.#readVarint(4, isZigzag);
    }

    readVarintInt64(isZigzag: boolean = true) {
        const [ret, offset] = Tools.ReadVarintNumber64(this.view, this.offset, isZigzag);
        this.offset = offset;
        return ret;
    }

    readFloat() {
        const ret = this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return ret;
    }

    readDouble() {
        if (this.offset >= this.view.byteLength) return -13;
        switch(this.view.getUint8(this.offset++)) {
            case 0: {
                return 0;
            }
            case 1: {
                return Number.NaN;
            }
            case 2: {
                return -Number.MAX_VALUE;
            }
            case 3: {
                return Number.MAX_VALUE;
            }
            case 4: {
                return this.readVarintInt32();
            }
            case 5: {
                if (this.offset >= this.view.byteLength) return -14;
                const ret = this.view.getFloat64(this.offset, true);
                this.offset += 8;
                return ret;
            }
            default:
                return -15;
        }
    }

    readString() {
        const len = this.readVarintInt32(false);
        // const str = utf8.decode()
        let str = '';
        for (let i = 0; i < len; ++i) {
            str += String.fromCharCode(this.readUInt8());
        }
        // this.offset += len;
        return str;
    }

    readRandom() {
        // TODO
        this.offset += 232;
        return 0;
    }

    // readXXPos() {
    //     const x = this.readFloat();
    //     const y = this.readFloat();
    //     // $FlowFixMe  
    //     return {
    //         x: x,
    //         y: y,
    //     };
    // }

    writeUInt8(value: number) {
        this.view.setUint8(this.offset++, value);
    } 
    
    writeInt8(value: number) {
        this.view.setInt8(this.offset++, value);
    }

    writeInt32(value: number) {
        this.view.setInt32(this.offset, value, true);
        this.offset += 4;
    }

    // writeVarintInt8(value: number, isZigzag: boolean = true) {
    //     // $FlowFixMe
    //     this.#writeVarint(value, 1, isZigzag);
    // }

    writeVarintInt16(value: number, isZigzag: boolean = true) {
        // $FlowFixMe
        this.#writeVarint(value, 2, isZigzag);
    }

    writeVarintInt32(value: number, isZigzag: boolean = true) {
        // $FlowFixMe
        this.#writeVarint(value, 4, isZigzag);
    }

    writeVarintInt64(value: any, isZigzag: boolean = true) {
        this.offset = Tools.WriteVarintNumber64(this.view, this.offset, value, isZigzag);
    }

    writeFloat(value: number) {
        this.view.setFloat32(this.offset, value, true);
        this.offset += 4;
    }

    writeDouble(value: number) {
        // TODO 待验证
        if (value == 0) {
            this.writeUInt8(0);
        } else if (Number.isNaN(value)) {
            this.writeUInt8(1);
        } else if (value == -Number.MAX_VALUE) {
            this.writeUInt8(2);
        } else if (value == Number.MAX_VALUE) {
            this.writeUInt8(3);
        } else {
            const num1 = Math.floor(value);
            if (value == num1) {
                this.writeVarintInt32(num1);
            } else {
                this.view.setFloat64(this.offset, value, true);
                this.offset += 8;
            }
        }
    }

    writeString(txt: string) {
        // TODO
        const len = txt.length;
        this.writeVarintInt32(len, false)
        for (let i = 0; i < len; ++i) {
            this.writeUInt8(txt.charCodeAt(i));
        }
    }

    writeRandom(obj: any) {
        this.offset += 232;
    }

    // TODO
    // writeXXPos(obj: any) {
    //     this.writeFloat(obj.x);
    //     this.writeFloat(obj.y);
    // }
}

module.exports = {
    MsgBuffer: MsgBuffer,
}
