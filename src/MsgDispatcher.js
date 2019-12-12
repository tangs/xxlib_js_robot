const Pong = require("./pkg/Pong")

class MsgDispatcher {
    infos = [];

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
        const dv = new DataView(msg.buffer);
        let idx = 0;
        const len = dv.getInt32(idx, true);
        idx += 4;

        const unType = dv.getUint8(idx++);
        const pkgId = dv.getUint8(idx++);
        console.log(`pkgId:${pkgId}, len:${len}.`);

        if (pkgId == 6) {
            const pong = new Pong();
            pong.decode(msg.buffer);
            console.dir(pong);
            const now = BigInt(new Date().getTime());
            console.log(`ping:${now - pong.ticks}`);
        }
    }
}

module.exports = MsgDispatcher
