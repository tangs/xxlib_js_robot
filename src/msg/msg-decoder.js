// @flow

const assert = require("assert");

const { MsgBuffer } = require("./buffer");
const { PkgBase, DataType } = require("../proto/pkg-base");
const listXXPos = require("../proto/special/list-xxpos");

class MsgDecoder {
    buffer: MsgBuffer = new MsgBuffer();
    pkgMap: Map<number, Function> = new Map();

    constructor() {
        require("../proto/regiser-pkgs")(this);
        this.register(listXXPos);
    }

    register = (pkgClass: Object) => {
        this.pkgMap.set(pkgClass.pkgTypeId, pkgClass);
    }

    createPkg = (): (PkgBase | string | null) => {
        const buffer = this.buffer;
        const pkgId = buffer.readVarintInt16(false);

        if (pkgId == 0) {
            return null;
        }

        const idx = buffer.readVarintInt32(false);
        const destObj = buffer.getObj(idx);
        if (destObj) {
            return destObj;
        } 

        if (pkgId == 1) {
            const ret = buffer.readString();
            buffer.setObj(idx, ret);
            return ret;
        }

        console.log(`pkgId: ${pkgId}`);

        if (this.pkgMap.has(pkgId)) {
            const class1: any = this.pkgMap.get(pkgId);
            const obj = new class1();
            buffer.setObj(idx, obj);
            obj.decode(buffer, this.createPkg);
            return obj;
        } else {
            assert(`can't find pkg id:${pkgId}.`);
            console.log(`can't find pkg id:${pkgId}.`);
            return null;
        }
    }

    decode = (reveivedMsg: Buffer, skipHead: boolean = false): (PkgBase | string | null) => {
        const bytes = reveivedMsg.buffer;
        const buffer = this.buffer;

        // init buffer
        buffer.setBuffer(bytes);
        buffer.reset();

        if (!skipHead) {
            const len = buffer.readInt32();
            // skip seral id.
            buffer.skip(1);
        }
        buffer.saveHeadOffset();

        return this.createPkg();
    }
}

module.exports = {
    MsgDecoder: MsgDecoder,
}
