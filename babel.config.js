const presets = [
    ["@babel/preset-flow"],
    // ["@babel/preset-env"],
];
const plugins = [
    ["@babel/plugin-transform-arrow-functions"],
    // ["@babel/transform-runtime"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-syntax-bigint"],
];
  
module.exports = { 
    presets,
    plugins,
};
