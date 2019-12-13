const net = require('net');
const zz = require('./tools/zigzag')

const MsgDispatcher = require('./msg/MsgDispatcher')
const { MsgEncoder } = require('./msg/MsgEncoder')
const Ping = require('./pkg/Ping')

const OpenAutoLock = require("./pkg/CatchFish/Events/Event/OpenAutoLock")
const CloseAutoLock = require("./pkg/CatchFish/Events/Event/CloseAutoLock")

const client = new net.Socket();
const md = new MsgDispatcher();
const msgEncoder = new MsgEncoder();

// const test = () => {
// 	let num = 3636;
// 	console.log(zz.encode(3636, 4));
// 	console.log(zz.encode64(3636n));
// 	console.log(zz.decode(3636, 4));
// 	console.log(zz.decode64(3636n));
// }

// test();
// return;

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
		console.log('send:' + bin.length);
		print(bin);
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

	// let ifOpen = false;

	const updatePing = () => {
		const ping = new Ping();
		ping.ticks = BigInt(new Date().getTime());
		const enterPing = msgEncoder.encode(ping);

		sendMsg(enterPing);
		// const obj = ifOpen ? new CloseAutoLock() : new OpenAutoLock();
		// obj.playerId = 145;
		// ifOpen != ifOpen;
		// sendMsg(msgEncoder.encode(obj))
		// print(enterPing);
		setTimeout(updatePing, 5000);
	};
	setTimeout(updatePing, 1000);
});

client.on('data', function(data) {
	// console.log("recived:");
	print(data);
	md.onRecivedMsg(data);
});

client.on('close', function() {
	console.log('Connection closed');
});
