const net = require('net');

const client = new net.Socket();

const print = (data) => {
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

client.connect(45621, '192.168.1.240', function() {
	console.log('Connected');

	const sendMsg = (bin) => {
		console.log('' + bin.length);
		client.write(bin, (err) => {
			if (err)
				console.log(err);
		});
	}
	// client.write('Hello, server! Love, Client.');
	const enterBin = new Uint8Array([
		// 0xD0, 0x58, 0x08, 0x44,
		// 0xF9, 0x7F, 0x00, 0x00,
		0x06, 0x00, 0x00, 0x00,
		0x00, 0x0e, 0x01, 0x01,
		0x03, 0x00,
	]);
	// arr[0] = 0;
	sendMsg(enterBin);

	const ping = () => {
		const enterPing = new Uint8Array([
			// 0xD0, 0x58, 0x08, 0x44,
			// 0xF9, 0x7F, 0x00, 0x00,
			0x07, 0x00, 0x00, 0x00,
			0x01, 0x05, 0x01, 0x01,
			0x03, 0x00, 0x01,
		]);
		let time = new Date().getTime();
		for (let i = 7; i < 11; ++i) {
			enterPing[i] = (time & 0x7F) | 0x80;
			time >>= 7;
		}
		enterPing[10] ^= 0x80;
		print(enterPing);
		// arr[0] = 0;
		sendMsg(enterPing);
		setTimeout(ping, 5000)
	};
	setTimeout(ping, 1000)
});

client.on('data', function(data) {
	// print(data);
	const dv = new DataView(data.buffer);
	let idx = 0;
	const len = dv.getInt32(idx, true);
	idx += 4;

	const unType = dv.getUint8(idx++);
	const pkgId = dv.getUint8(idx++);

	// console.log(`len:${len}, unType:${unType}, pkgId:${pkgId}`);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
