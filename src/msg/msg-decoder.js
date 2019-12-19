// @flow

const assert = require("assert");

const { MsgBuffer } = require("./buffer");
const { PkgBase, XXList, DataType } = require("../proto/pkg-base");

// const XXList = require("../proto/special/xxlist");
const XXlistXXPos = require("../proto/special/xxlist-xxpos");

class MsgDecoder {
    buffer: MsgBuffer = new MsgBuffer();
    pkgMap: Map<number, Function> = new Map();

    constructor() {
        require("../proto/regiser-pkgs")(this);
        this.register(XXlistXXPos);
    }

    register = (pkgClass: Object) => {
        this.pkgMap.set(pkgClass.pkgTypeId, pkgClass);
    }

    decodeList(key: string, buffer: MsgBuffer, cb: Function) {
        const typeId = buffer.readVarintInt16(false);
        if (typeId == 0) {
            return;
        }
        const idx = buffer.readVarintInt32(false);

        const destObj = buffer.findObjInCache(idx);
        if (destObj) {
            return destObj;
        } 

        const list: XXList<any> = new XXList();
        const arr = list.arr;
        // const list = [];
        list.pkgTypeId = typeId;
        const len = buffer.readVarintInt32(false);
        // console.log(`key:${key}, typeId: ${typeId}, idx: ${idx}, len:${len}`);
        for (let i = 0; i < len; ++i) {
            const obj = cb();
            if (obj == null) continue;
            arr.push(obj);
        }
        buffer.cacheObj(idx, list);
        // $FlowFixMe
        // this.#setValue(key, list);
        return list;
    }

    createPkg = (): (PkgBase | string | null) => {
        const buffer = this.buffer;
        const pkgId = buffer.readVarintInt16(false);

        if (pkgId == 0) {
            return null;
        }

        const idx = buffer.readVarintInt32(false);
        const destObj = buffer.findObjInCache(idx);
        if (destObj) {
            return destObj;
        } 

        if (pkgId == 1) {
            const ret = buffer.readString();
            buffer.cacheObj(idx, ret);
            return ret;
        }

        console.log(`pkgId: ${pkgId}`);

        if (this.pkgMap.has(pkgId)) {
            const class1: any = this.pkgMap.get(pkgId);
            const obj = new class1();
            buffer.cacheObj(idx, obj);
            obj.decode(buffer, this);
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
