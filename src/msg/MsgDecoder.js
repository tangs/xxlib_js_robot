const { Buffer } = require("./Buffer")

const Ping = require("../pkg/Ping")
const Pong = require("../pkg/Pong")
const List_Int32 = require("../pkg/List_Int32")


const FrameEvents = require("../pkg/FrameEvents")
const Events = require("../pkg/Events")

const Fire = require("../pkg/CatchFish/Events/Event/Fire")
const FishDead = require("../pkg/CatchFish/Events/Event/FishDead")
const OpenAutoLock = require("../pkg/CatchFish/Events/Event/OpenAutoLock")
const CloseAutoLock = require("../pkg/CatchFish/Events/Event/CloseAutoLock")

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
        this.register(OpenAutoLock);
        this.register(CloseAutoLock);
    }

    register = (pkgClass) => {
        this.pkgMap.set(pkgClass.typeId, pkgClass);
    }

    _createPkg = () => {
        const buffer = this.buffer;
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

    decode = (reveivedMsg) => {
        const bytes = reveivedMsg.buffer;
        const buffer = this.buffer;

        // init buffer
        buffer.setBuffer(bytes);
        buffer.reset();

        const len = buffer.readInt32();
        // skip seral id.
        buffer.skip(1);

        return this._createPkg();
    }
}

module.exports = {
    MsgDecoder: MsgDecoder,
}
