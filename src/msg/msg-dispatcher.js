// @flow

// const Pong = require("../pkg/PKG/Generic/Pong")
const { PkgBase } = require("../pkg/pkg-base")

const { MsgDecoder } = require("./msg-decoder")
const util = require('util')

class Info {
    type: number;
    target: any;
    cb: Function;

    constructor(type: number, target: any, cb: Function) {
        this.type = type;
        this.target = target;
        this.cb = cb;
    }
}

class MsgDispatcher {
    infos: Info[] = [];
    md = new MsgDecoder();

    dispatch = (pkg: PkgBase) => {
        const infos = this.infos;
        const len = infos.length;
        for (let i = 0; i < len; ++i) {
            const info = infos[i];
            if (info.type == pkg.typeId) {
                info.cb.call(info.target, pkg);
            }
        }
    }

    register = (type: number, target: any, cb: Function) => {
        this.infos.push(new Info(type, target, cb));
    }

    unregister = (target: any, cb: Function) => {
        const infos = this.infos;
        for (let i = infos.length - 1; i >= 0; --i) {
            const info = infos[i];
            if (target = info.target && cb == info.cb) {
                infos.splice(i, 1);
            }
        }
    }

    unregisterAll = (target: any) => {
        const infos = this.infos;
        const len = infos.length;
        for (let i = len - 1; i >= 0; --i) {
            if (infos[i].target == target) {
                infos.splice(i, 1);
            }
        }
    }

    onRecivedMsg = (msg: Buffer) => {
        const pkg = this.md.decode(msg);
        if (pkg instanceof PkgBase) {
            console.log(pkg.typeId);
            // $FlowFixMe
            // console.log(util.inspect(pkg, false, null, true));
            // $FlowFixMe
            this.dispatch(pkg);
        } else {
            // console.log("pkg is null");
        }
    }
}

module.exports = MsgDispatcher
