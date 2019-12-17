// @flow

const net = require('net');
const zz = require('./tools/zigzag')
const util = require('util')

const MsgDispatcher = require('./msg/MsgDispatcher')
const { MsgEncoder } = require('./msg/MsgEncoder')

const Ping = require('./pkg/PKG/Generic/Ping')
const Pong = require('./pkg/PKG/Generic/Pong')
const Enter = require("./pkg/PKG/Client_CatchFish/Enter")
const Fire = require("./pkg/PKG/Client_CatchFish/Fire")
const EnterSuccess = require("./pkg/PKG/CatchFish_Client/EnterSuccess")

const client = new net.Socket();
const md = new MsgDispatcher();
const msgEncoder = new MsgEncoder();

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

let isConnect = true;
client.connect(45621, '192.168.1.240', function() {
	console.log('Connected');

	const sendMsg = (bin: Uint8Array) => {
		if (!isConnect) {
			console.log("connect is close.");
			return;
		}
		console.log('send:' + bin.length);
		print(bin);
		client.write(bin, (err) => {
			if (err) console.log(err);
		});
	}

	const sendEnterMsg = () => {
		// send enter msg.
		const enter = new Enter();
		const enterMsg = msgEncoder.encode(enter, 0);
		sendMsg(enterMsg);
	};

	let lastPingTime: number = 0;
	const updatePing = () => {
		if (!isConnect) return;
		const ping = new Ping();
		lastPingTime = new Date().getTime();
		// $FlowFixMe
		ping.ticks = BigInt(lastPingTime);
		const pingMsg = msgEncoder.encode(ping);

		sendMsg(pingMsg);
		setTimeout(updatePing, 5000);
	};
	setTimeout(updatePing, 1000);

	let enterMsg: EnterSuccess;
	let frame = 0;
	// game update.
	const gameUpdate = () => {
		if (!isConnect) return;

		const fire = new Fire();
		// fire.

		++frame;
		// 60 PFS
		setTimeout(gameUpdate, 1000 / 60);
	};
	
	md.register(EnterSuccess.typeId, this, (msg) => {
		enterMsg = msg;
		gameUpdate();
		// $FlowFixMe
		console.log(util.inspect(msg, false, null, true));
	});

	md.register(Pong.typeId, this, (msg) => {
		// $FlowFixMe
		console.log(util.inspect(msg, false, null, true));
		console.log(`ping:${new Date().getTime() - lastPingTime}`);
	});

	sendEnterMsg();
});

client.on('data', function(data) {
	// console.log("recived:");
	// print(data);
	md.onRecivedMsg(data);
});

client.on('close', function() {
	console.log('Connection closed');
	isConnect = false;
});
