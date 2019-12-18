// @flow

const { Buffer } = require("./buffer")

class MsgEncoder {
    static serialId = 0;
    buffer = new Buffer();
    
    constructor() {
        const capacity = 1024 * 1024;
        const arr = new ArrayBuffer(capacity);
        this.buffer.setBuffer(arr)
    }

    #encode = (pkg: Object) => {
        const buffer = this.buffer;

        buffer.writeVarintInt32(pkg.typeId, false);

        const key = buffer.getKeyByObj(pkg);
        if (key) {
            buffer.writeVarintInt32(key);
        } else {
            // const idx = buffer.getOffset() - 4 - 1;
            const idx = buffer.getOffsetWithoutSeriaId();
            buffer.writeVarintInt32(idx, false);
            buffer.setObj(idx, pkg);
        }

        pkg.encode(buffer, this.#encode);
    }

    encode = (pkg: Object, serialId?: number) => {
        const buffer = this.buffer;
        buffer.reset();
        // len
        buffer.skip(4);
        // seral id
        if (serialId != null) {
            buffer.writeVarintInt32(serialId);
            buffer.saveFactOffset();
        } else {
            console.log(`serial id: ${MsgEncoder.serialId}`);
            MsgEncoder.serialId = (MsgEncoder.serialId + 1) & 0x7FFFFFFF;
            buffer.writeVarintInt32(-MsgEncoder.serialId);
            buffer.saveFactOffset();
        }
        this.#encode(pkg);

        // set len
        buffer.writeLenToHead()

        return buffer.getUInt8Array();
    }
}

module.exports = {
    MsgEncoder: MsgEncoder,
}
