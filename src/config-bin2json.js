// @flow

const fs = require("fs");
const util = require('util');

const { MsgDecoder } = require('./msg/msg-decoder');

const print = (data: any) => {
	if (typeof(data) == 'string') {
		console.log('data: ' + data);
	} else {
		console.log('data: ' + data.length.toString(16));
		let txt = '';
		let idx = 0;
		for (const cell of data) {
			txt += `${('0' + cell.toString(16)).slice(-2)} `;
			if (++idx % 16 == 0) {
				txt += '\n';
			}
		}
		console.log(txt)
	}
};

const buf = fs.readFileSync('./config/cfg.bin');
print(buf);

const md = new MsgDecoder();
const msg = md.decode(buf, true);

const txt = JSON.stringify(msg, (key, value) => {
	// $FlowFixMe
	const type = typeof value;
	if (type === 'object' && value && value.pkgDatasType) {
		delete value.pkgDatasType;
	}
	return type === 'bigint' ? value.toString() : value;
}, 4);
fs.writeFileSync("./dist/cfg.json", txt);

// $FlowFixMe
// console.log(util.inspect(msg, false, null, true));
