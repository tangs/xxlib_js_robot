const { Buffer } = require("./Buffer")

const Ping = require("../pkg/Ping")
const Pong = require("../pkg/Pong")

const print = (data) => {
	if (typeof(data) == 'string') {
		console.log('data: ' + data);
	} else {
		console.log('data: ' + data.length.toString(16));
		let txt = '';
		let idx = 0;
		for (const cell of data) {
			txt += `${('0' + cell.toString(16)).slice(-2)} `;
			if (++idx % 16 == 0) {
				txt += '\n';
			}
		}
		console.log(txt)
	}
};

class MsgDecoder {
    buffer = new Buffer();
    pkgMap = new Map();

    constructor() {
        this.register(5, Ping);
        this.register(6, Pong);
    }

    register(id, pkgClass) {
        this.pkgMap.set(id, pkgClass);
    }

    decode(msg) {
        const bytes = msg.buffer;
        const buffer = this.buffer;

        // init buffer
        buffer.setBuffer(bytes);
        buffer.reset();

        const len = buffer.readInt32();
        // skip seral id.
        buffer.skip(1);

        const pkgId = this.buffer.readUInt8();
        // buffer.skip(1);
        const idx = this.buffer.readZigzagInt32();
        // console.log(`pkgId:${pkgId}, len:${len}, id:${id}.`);

        // if (pkgId == 11 || pkgId == 6) {
        //     print(msg);
        // }

        if (this.pkgMap.has(pkgId)) {
            const class1 = this.pkgMap.get(pkgId);
            const obj = new class1();
            obj.decode(buffer);
            // console.dir(obj);
            return obj;
        } else {
            return;
        }
    }
}

module.exports = {
    MsgDecoder: MsgDecoder,
}
