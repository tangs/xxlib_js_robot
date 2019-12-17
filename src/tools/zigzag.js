// @flow

function encode(num: number, bits: number) {
  return (num << 1) ^ (num >>> (bits * 8 - 1))
}

function decode(num: number, bits: number) {
  return (num >> 1) ^ ((num & 1) == 1 ? 
    (0xffffffffffffffff >> (64 - bits * 8)) : 0)
}

function encode64(num: any) {
  // $FlowFixMe
  return (num << 1n) ^ (num >> 63n)
}

function decode64(num: any) {
  // $FlowFixMe
  return (num >> 1n) ^ ((num & 1n) == 1n ? 0xffffffffffffffffn : 0n)
}

module.exports = {
  encode: encode,
  decode: decode,
  encode64: encode64,
  decode64: decode64
}
