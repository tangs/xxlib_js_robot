const Pong = require("./pkg/Pong")
const { MsgDecoder } = require("./msg/MsgDecoder")
const util = require('util')

class MsgDispatcher {
    infos = [];
    md = new MsgDecoder();

    register = (type, target, cb) => {
        // this.infos.push([cb, type, target]);
        this.infos.push({
            cb: cb, 
            type: type, 
            target: target
        });
    }

    unregister = (cb) => {
        const idx = this.infos.indexOf(cb);
        if (idx != -1) {
            this.infos.splice(idx, 1);
        }
    }

    unregisterAll = (target) => {
        const infos = this.infos;
        const len = infos.length;
        for (let i = len - 1; i >= 0; --i) {
            if (infos[i].target == target) {
                infos.splice(i, 1);
            }
        }
    }

    onRecivedMsg = (msg) => {
        const pkg = this.md.decode(msg);
        if (pkg) {
            // console.dir(pkg);
            console.log(util.inspect(pkg, false, null, true));
        } else {
            // console.log("pkg is null");
        }
    }
}

module.exports = MsgDispatcher
