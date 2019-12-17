const { Buffer } = require("./Buffer")

class MsgEncoder {
    static seralId = 1;
    buffer = new Buffer();
    
    constructor() {
        const capacity = 1024 * 1024;
        const arr = new ArrayBuffer(capacity);
        this.buffer.setBuffer(arr)
    }

    _encode = (pkg) => {
        const buffer = this.buffer;

        buffer.writeVarintInt32(pkg.typeId, false);

        const key = buffer.getKeyByObj(pkg);
        if (key) {
            buffer.writeVarintInt32(key);
        } else {
            const idx = buffer.getOffset() - 4 - 1;
            buffer.writeVarintInt32(idx, false);
            buffer.setObj(idx, pkg);
        }

        pkg.encode(buffer, this._encode);
    }

    encode = (pkg, seralId) => {
        const buffer = this.buffer;
        buffer.reset();
        // len
        buffer.skip(4);
        // seral id
        if (seralId != null) {
            buffer.writeUInt8(seralId);
        } else {
            buffer.writeUInt8(MsgEncoder.seralId++);
        }
        this._encode(pkg);

        // set len
        buffer.writeLenToHead()

        return buffer.getUInt8Array();
    }
}


module.exports = {
    MsgEncoder: MsgEncoder,
}
