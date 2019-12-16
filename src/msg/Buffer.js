// @flow

const Tools = require("../pkg/Tools")
const { PkgBase, DataType } = require("../pkg/PkgBase")

class Buffer {
    buffer: ArrayBuffer;
    view: DataView;
    offset: number = 0;
    length: number = 0;
    objMap: Map<number, PkgBase> = new Map();

    setBuffer(buffer: ArrayBuffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer);
    }

    reset() {
        this.offset = 0;
        this.length = 0;
        this.objMap.clear();
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

    setObj(key: number, obj: PkgBase) {
        this.objMap.set(key, obj);
    }

    getObj(key: number) {
        if (this.objMap.has(key)) {
            return this.objMap.get(key);
        }
    }

    getKeyByObj(obj: PkgBase) {
        for (const [key, v] of this.objMap) {
            if (v == obj) return key;
        }
    }

    saveObj(obj: PkgBase) {
        const key = this.readVarintInt32();
        this.setObj(key, obj);
    }

    // _expansionIfNeed(bits) {
    //     // TODO 未验证
    //     if (this.offset + bits >= this.capacity) {
    //         capacity *= 2;
    //         const buffer = new ArrayBuffer(this.capacity);
    //         const dd = new Uint8Array(buffer);
    //         dd.set(this.buffer);
    //         this.buffer = buffer;
    //     }
    // }

    _readVarintInt(bits: number, isZigzag: bool = true) {
        const [ret, offset] = Tools.ReadVarintNumber(this.view, this.offset, bits, isZigzag);
        this.offset = offset;
        return ret;
    }

    _writeVarintInt(value: number, bits: number, isZigzag: bool = true) {
        this.offset = Tools.WriteVarintNumber(this.view, this.offset, value, bits, isZigzag);
    }

    readUInt8() {
        return this.view.getUint8(this.offset++);
    }

    readInt32() {
        const ret = this.view.getInt32(this.offset, true);
        this.offset += 4;
        return ret;
    }

    readVarintInt8(isZigzag: bool = true) {
        return this._readVarintInt(1, isZigzag);
    }

    readVarintInt16(isZigzag: bool = true) {
        return this._readVarintInt(2, isZigzag);
    }

    readVarintInt32(isZigzag: bool = true) {
        return this._readVarintInt(4, isZigzag);
    }

    readVarintInt64(isZigzag: bool = true) {
        const [ret, offset] = Tools.ReadVarintNumber64(this.view, this.offset, isZigzag);
        this.offset = offset;
        return ret;
    }

    readFloat() {
        const ret = this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return ret;
    }

    writeUInt8(value: number) {
        this.view.setUint8(this.offset++, value);
    }

    writeInt32(value: number) {
        this.view.setInt32(this.offset, value, true);
        this.offset += 4;
    }

    writeVarintInt8(value: number, isZigzag: bool = true) {
        this._writeVarintInt(value, 1, isZigzag);
    }

    writeVarintInt16(value: number, isZigzag: bool = true) {
        this._writeVarintInt(value, 2, isZigzag);
    }

    writeVarintInt32(value: number, isZigzag: bool = true) {
        this._writeVarintInt(value, 4, isZigzag);
    }

    writeVarintInt64(value: any, isZigzag: bool = true) {
        this.offset = Tools.WriteVarintNumber64(this.view, this.offset, value, isZigzag);
    }

    writeFloat(value: number) {
        this.view.setFloat32(this.offset, value);
        this.offset += 4;
    }

    writeLenToHead() {
        this.view.setInt32(0, this.offset - 4, true);
    }

    getUInt8Array(): Uint8Array {
        return new Uint8Array(this.buffer, 0, this.offset);
    }

}

module.exports = {
    Buffer: Buffer,
}
