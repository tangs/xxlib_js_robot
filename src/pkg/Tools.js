const zz = require('zigzag')

function WriteZigZagNumber(view, idx, number, bits) {
    let dest = zz.encode(number, bits);
    while (dest >= 1 << 7) {
        view.setUint8(idx++, Number((dest & 0x7f) | 0x80));
        dest >>= 7;
    }
    view.setUint8(idx++, Number(dest));
    return idx;
}

function WriteZigZagNumber64(view, idx, number) {
    let dest = zz.encode64(number);
    while (dest >= 1 << 7) {
        view.setUint8(idx++, Number((dest & 0x7fn) | 0x80n));
        dest >>= 7n;
    }
    view.setUint8(idx++, Number(dest));
    return idx;
}

function ReadZigZagNumber(view, idx, bits) {
    let num = 0;
    for (let i = 0; i < bits * 8; i += 7) {
        const b = view.getUint8(idx++);
        num |= (b & 0x7f) << i;
        if ((b & 0x80) == 0) {
            break;
        }
    }
    
    const dest = zz.encode(num, bits);
    return [dest, idx]
}

function ReadZigZagNumber64(view, idx) {
    let num = BigInt(0);
    for (let i = 0n; i < 64n; i += 7n) {
        const b = BigInt(view.getUint8(idx++));
        num |= (b & 0x7fn) << i;
        if ((b & 0x80n) == 0) {
            break;
        }
    }
    
    const dest = zz.decode64(num);
    return [dest, idx]
}

module.exports = {
    WriteZigZagNumber: WriteZigZagNumber,
    WriteZigZagNumber64: WriteZigZagNumber64,
    ReadZigZagNumber: ReadZigZagNumber,
    ReadZigZagNumber64: ReadZigZagNumber64,
}
