// @flow

const { MsgBuffer } = require("./buffer");
const { PkgBase, DataType } = require("../proto/pkg-base");

class MsgEncoder {
    static serialId = 0;
    buffer = new MsgBuffer();
    
    constructor() {
        const capacity = 1024 * 1024;
        const arr = new ArrayBuffer(capacity);
        this.buffer.setBuffer(arr)
    }

    #encode = (pkg: PkgBase) => {
        const buffer = this.buffer;

        buffer.writeVarintInt32(pkg.pkgTypeId, false);

        const key = buffer.findKeyInCache(pkg);
        if (key) {
            buffer.writeVarintInt32(key);
        } else {
            // const idx = buffer.getOffset() - 4 - 1;
            const idx = buffer.getOffsetWithoutHead();
            buffer.writeVarintInt32(idx, false);
            buffer.cacheObj(idx, pkg);
        }

        pkg.encode(buffer, this.#encode);
    }

    encode = (pkg: PkgBase, serialId?: number) => {
        const buffer = this.buffer;
        buffer.reset();
        // len
        buffer.skip(4);
        // seral id
        if (serialId != null) {
            buffer.writeVarintInt32(serialId);
            buffer.saveHeadOffset();
        } else {
            console.log(`serial id: ${MsgEncoder.serialId}`);
            MsgEncoder.serialId = (MsgEncoder.serialId + 1) & 0x7FFFFFFF;
            buffer.writeVarintInt32(-MsgEncoder.serialId);
            buffer.saveHeadOffset();
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
