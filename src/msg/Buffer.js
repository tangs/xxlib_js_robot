const Tools = require("../pkg/Tools")

class Buffer {
    // capacity = 1024 * 1024;
    // buffer = new ArrayBuffer(this.capacity);
    // view = new DataView(buffer)
    offset = 0;
    length = 0;
    objMap = new Map();

    setBuffer(buffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer);
    }

    reset() {
        this.offset = 0;
        this.length = 0;
        this.objMap.clear();
    }

    skip(len) {
        this.offset += len;
    }

    setOffset(offset) {
        this.offset = offset;
    }

    getOffset() {
        return this.offset;
    }

    setObj(key, obj) {
        this.objMap.set(key, obj);
    }

    getObj(key) {
        if (this.objMap.has(key)) {
            return this.objMap.get(key);
        }
    }

    getKeyByObj(obj) {
        for (const [key, v] of this.objMap) {
            if (v == obj) return key;
        }
    }

    saveObj(obj) {
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

    _readVarintInt(bits, isZigzag = true) {
        const [ret, offset] = Tools.ReadVarintNumber(this.view, this.offset, bits, isZigzag);
        this.offset = offset;
        return ret;
    }

    _writeVarintInt(value, bits, isZigzag = true) {
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

    readVarintInt8(isZigzag = true) {
        return this._readVarintInt(1, isZigzag);
    }

    readVarintInt16(isZigzag = true) {
        return this._readVarintInt(2, isZigzag);
    }

    readVarintInt32(isZigzag = true) {
        return this._readVarintInt(4, isZigzag);
    }

    readVarintInt64(isZigzag = true) {
        const [ret, offset] = Tools.ReadVarintNumber64(this.view, this.offset, isZigzag);
        this.offset = offset;
        return ret;
    }

    readFloat() {
        const ret = this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return ret;
    }

    writeUInt8(value) {
        this.view.setUint8(this.offset++, value);
    }

    writeInt32(value) {
        this.view.setInt32(this.offset, value, true);
        this.offset += 4;
    }

    writeVarintInt8(value, isZigzag = true) {
        this._writeVarintInt(value, 1, isZigzag);
    }

    writeVarintInt16(value, isZigzag = true) {
        this._writeVarintInt(value, 2, isZigzag);
    }

    writeVarintInt32(value, isZigzag = true) {
        this._writeVarintInt(value, 4, isZigzag);
    }

    writeVarintInt64(value, isZigzag = true) {
        this.offset = Tools.WriteVarintNumber64(this.view, this.offset, value, isZigzag);
    }

    writeFloat(value) {
        this.view.setFloat32(this.offset, value);
        this.offset += 4;
    }

    writeLenToHead() {
        this.view.setInt32(0, this.offset - 4, true);
    }

    getUInt8Array() {
        return new Uint8Array(this.buffer, 0, this.offset);
    }

}

module.exports = {
    Buffer: Buffer,
}
