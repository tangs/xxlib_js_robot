const { Buffer } = require("./Buffer")

const Ping = require("../pkg/Ping")
const Pong = require("../pkg/Pong")
const List_Int32 = require("../pkg/List_Int32")


const FrameEvents = require("../pkg/FrameEvents")
const Events = require("../pkg/Events")

const Fire = require("../pkg/CatchFish/Events/Event/Fire")
const FishDead = require("../pkg/CatchFish/Events/Event/FishDead")

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
        this.register(Ping);
        this.register(Pong);
        this.register(List_Int32);
        this.register(FrameEvents);
        this.register(Events);
        this.register(Fire);
        this.register(FishDead);
    }

    register = (pkgClass) => {
        this.pkgMap.set(pkgClass.typeId, pkgClass);
    }

    _createPkg = (buffer) => {
        const pkgId = buffer.readUInt8();

        if (this.pkgMap.has(pkgId)) {
            const class1 = this.pkgMap.get(pkgId);
            const idx = buffer.readVarintInt32();
            const destObj = buffer.getObj(idx);
            if (destObj) {
                return destObj;
            } else {
                const obj = new class1();
                buffer.setObj(idx, obj);
                obj.decode(buffer, this._createPkg);
                // console.dir(obj);
                return obj;
            }
        } else {
            console.log(`can't find pkg id:${pkgId}.`)
            return;
        }
    }

    decode = (msg) => {
        const bytes = msg.buffer;
        const buffer = this.buffer;

        // init buffer
        buffer.setBuffer(bytes);
        buffer.reset();

        const len = buffer.readInt32();
        // skip seral id.
        buffer.skip(1);

        return this._createPkg(buffer);
    }
}

module.exports = {
    MsgDecoder: MsgDecoder,
}
