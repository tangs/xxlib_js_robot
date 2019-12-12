const zz = require('zigzag')

function WriteZigZagNumber(view, idx, number, isInt32) {
    let dest = isInt32 ? zz.encode32(number) : zz.encode64(number);
    // console.log(`number:${number}, zz:${dest}`);
    // console.log(`${zz.decode64(dest)}`);
    while (dest >= 1 << 7) {
        view.setUint8(idx++, Number((dest & 0x7fn) | 0x80n));
        dest >>= 7n;
        // console.log((dest & 0x7f) | 0x80);
    }
    view.setUint8(idx++, Number(dest));
    // console.log(dest);
    return idx;
}

function ReadZigZagNumber(view, idx, isInt32) {
    let num = BigInt(0);
    for (let i = 0n; i < 64n; i += 7n) {
        const b = BigInt(view.getUint8(idx++));
        num |= (b & 0x7fn) << i;
        if ((b & 0x80n) == 0) {
            break;
        }
    }

    const dest = isInt32 ? zz.decode32(num) : zz.decode64(num);
    return [dest, idx]
}

module.exports = {
    WriteZigZagNumber: WriteZigZagNumber,
    ReadZigZagNumber: ReadZigZagNumber
}
