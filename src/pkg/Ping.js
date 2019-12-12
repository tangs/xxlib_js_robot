const Tools = require("./Tools")

class Ping {
    typeId = 5;
    ticks = BigInt(0); // int64
    datas = [
        {
            type: 1,
            value: 'ticks'
        }
    ];

    // 0x01, 0x05, 0x01, 0x01,
	// 0x03, 0x00, 0x01,
    decode(msg) {
        const dv = new DataView(msg.buffer);
    }

    encode() {
        // const buffer = new ArrayBuffer(16);
        const buffer = new Uint8Array(16);
        const view = new DataView(buffer.buffer);
        let idx = 4;
        // serial number
        view.setUint8(idx++, 1);
        view.setUint8(idx++, this.typeId);
        // idx
        view.setUint8(idx++, idx - 4 - 2);
        idx = Tools.WriteZigZagNumber(view, idx, this.ticks, false);
        view.setUint32(0, idx - 4, true);
        // buffer.length = idx;
        return buffer.slice(0, idx);
    }
}

module.exports = Ping;
