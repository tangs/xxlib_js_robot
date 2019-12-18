// @flow

const { Buffer: Buffer1 } = require("./buffer");
const { PkgBase, DataType } = require("../proto/pkg-base");

class MsgDecoder {
    buffer: Buffer1 = new Buffer1();
    pkgMap: Map<number, Function> = new Map();

    constructor() {
        require("../proto/regiser-pkgs")(this);
    }

    register = (pkgClass: Function) => {
        this.pkgMap.set(pkgClass.typeId, pkgClass);
    }

    createPkg = (): (PkgBase | null) => {
        const buffer = this.buffer;
        const pkgId = buffer.readUInt8();

        if (pkgId == 1) return null;
        console.log(`pkgId: ${pkgId}`);

        if (this.pkgMap.has(pkgId)) {
            const class1: any = this.pkgMap.get(pkgId);
            const idx = buffer.readVarintInt16();
            const destObj = buffer.getObj(idx);
            if (destObj) {
                return destObj;
            } else {
                const obj = new class1();
                buffer.setObj(idx, obj);
                obj.decode(buffer, this.createPkg);
                return obj;
            }
        } else {
            console.log(`can't find pkg id:${pkgId}.`);
            return null;
        }
    }

    decode = (reveivedMsg: Buffer): (PkgBase | null) => {
        const bytes = reveivedMsg.buffer;
        const buffer = this.buffer;

        // init buffer
        buffer.setBuffer(bytes);
        buffer.reset();

        const len = buffer.readInt32();
        // skip seral id.
        buffer.skip(1);

        return this.createPkg();
    }
}

module.exports = {
    MsgDecoder: MsgDecoder,
}
