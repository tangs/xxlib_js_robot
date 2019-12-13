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

    setObj(key, obj) {
        this.objMap.set(key, obj);
    }

    getObj(key) {
        if (this.objMap.has(key)) {
            return this.objMap.get(key);
        }
    }

    saveObj(obj) {
        const key = this.readZigzagInt32();
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

    _readZigzagInt(bits) {
        const [ret, offset] = Tools.ReadZigZagNumber(this.view, this.offset, bits);
        this.offset = offset;
        return ret;
    }

    _writeZigzagInt(value, bits) {
        this.offset = Tools.WriteZigZagNumber(this.view, this.offset, value, bits);
    }

    readUInt8() {
        return this.view.getUint8(this.offset++);
    }

    readInt32() {
        const ret = this.view.getInt32(this.offset, true);
        this.offset += 4;
        return ret;
    }

    readZigzagInt8() {
        return this._readZigzagInt(1);
    }

    readZigzagInt16() {
        return this._readZigzagInt(2);
    }

    readZigzagInt32() {
        return this._readZigzagInt(4);
    }

    readZigzagInt64() {
        const [ret, offset] = Tools.ReadZigZagNumber64(this.view, this.offset);
        this.offset = offset;
        return ret;
    }

    writeInt8(value) {
        this.view.setUint8(this.offset++, value);
    }

    writeZigzagInt8(value) {
        this._writeZigzagInt(value, 1);
    }

    writeZigzagInt16(value) {
        this._writeZigzagInt(value, 2);
    }

    writeZigzagInt32(value) {
        this._writeZigzagInt(value, 4);
    }

    writeZigzagInt64(value) {
        this.offset = Tools.WriteZigZagNumber64(this.view, this.offset, value);
    }

}

module.exports = {
    Buffer: Buffer,
}
