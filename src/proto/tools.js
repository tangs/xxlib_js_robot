const zz = require('../tools/zigzag')

function WriteVarintNumber(view, idx, number, bits, isZigzag = true) {
    let dest = number;
    if (isZigzag) {
        dest = zz.encode(number, bits);
    }
    while (dest >= 1 << 7) {
        view.setUint8(idx++, Number((dest & 0x7f) | 0x80));
        dest >>= 7;
    }
    view.setUint8(idx++, Number(dest));
    return idx;
}

function WriteVarintNumber64(view, idx, number, isZigzag = true) {
    let dest = number;
    if (isZigzag) {
        dest = zz.encode64(number);
    }
    while (dest >= 1 << 7) {
        view.setUint8(idx++, Number((dest & 0x7fn) | 0x80n));
        dest >>= 7n;
    }
    view.setUint8(idx++, Number(dest));
    return idx;
}

function ReadVarintNumber(view, idx, bits, isZigzag = true) {
    let num = 0;
    for (let i = 0; i < bits * 8; i += 7) {
        const b = view.getUint8(idx++);
        num |= (b & 0x7f) << i;
        if ((b & 0x80) == 0) {
            break;
        }
    }
    
    if (isZigzag) {
        const dest = zz.decode(num, bits);
        // console.log(num, dest)
        return [dest, idx];
    } else {
        return [num, idx];
    }
}

function ReadVarintNumber64(view, idx, isZigzag = true) {
    let num = BigInt(0);
    for (let i = 0n; i < 64n; i += 7n) {
        const b = BigInt(view.getUint8(idx++));
        num |= (b & 0x7fn) << i;
        if ((b & 0x80n) == 0) {
            break;
        }
    }
    
    if (isZigzag) {
        const dest = zz.decode64(num);
        return [dest, idx];
    } else {
        return [num, idx];
    }
}

module.exports = {
    WriteVarintNumber: WriteVarintNumber,
    WriteVarintNumber64: WriteVarintNumber64,
    ReadVarintNumber: ReadVarintNumber,
    ReadVarintNumber64: ReadVarintNumber64,
}
