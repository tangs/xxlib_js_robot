// @flow

const { Buffer } = require("./Buffer")

class MsgEncoder {
    static seralId = 0;
    buffer = new Buffer();
    
    constructor() {
        const capacity = 1024 * 1024;
        const arr = new ArrayBuffer(capacity);
        this.buffer.setBuffer(arr)
    }

    _encode = (pkg: Object) => {
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

    encode = (pkg: Object, seralId?: number) => {
        const buffer = this.buffer;
        buffer.reset();
        // len
        buffer.skip(4);
        // seral id
        if (seralId != null) {
            buffer.writeVarintInt32(seralId);
        } else {
            MsgEncoder.seralId = (MsgEncoder.seralId + 1) & 0x7FFFFFFF;
            buffer.writeVarintInt32(-MsgEncoder.seralId);
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
