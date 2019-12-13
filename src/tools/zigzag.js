module.exports = {
  encode: encode,
  decode: decode,
  encode64: encode64,
  decode64: decode64
}

function encode(num, bits) {
  return (num << 1) ^ (num >>> (bits * 8 - 1))
}

function decode(num, bits) {
  return (num >> 1) ^ ((num & 1) == 1 ? 
    (0xffffffffffffffff >> (64 - bits * 8)) : 0)
}

function encode32(num) {
  return (num << 1) ^ (num >> 31)
}

function decode32(num) {
  return (num >>> 1) ^ -(num & 1)
}

function encode64(num) {
  return (num << 1n) ^ (num >> 63n)
}

function encode64low(low, high) {
  return (low << 1) ^ (high >> 31)
}

function encode64high(low, high) {
 return (low >>> 31) ^ (high << 1) ^ (high >> 31)
}

function decode64(num) {
  return (num >> 1n) ^ ((num & 1n) == 1n ? 0xffffffffffffffffn : 0n)
}

function decode64low(low, high) {
  return (high << 31) ^ (low >>> 1) ^ -(low & 1)
}

function decode64high(low, high) {
  return (high >>> 1) ^ -(low & 1)
}
