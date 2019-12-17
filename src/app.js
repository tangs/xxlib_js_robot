// @flow

const net = require('net');
const zz = require('./tools/zigzag')
const util = require('util')

const MsgDispatcher = require('./msg/MsgDispatcher')
const { MsgEncoder } = require('./msg/MsgEncoder')

const { PkgBase } = require("./pkg/PkgBase")

const Ping = require('./pkg/PKG/Generic/Ping')
const Pong = require('./pkg/PKG/Generic/Pong')

const Enter = require("./pkg/PKG/Client_CatchFish/Enter")
const Fire = require("./pkg/PKG/Client_CatchFish/Fire")
const Hit = require("./pkg/PKG/Client_CatchFish/Hit")

const EnterSuccess = require("./pkg/PKG/CatchFish_Client/EnterSuccess")
const FrameEvents = require("./pkg/PKG/CatchFish_Client/FrameEvents")

const PushFishEvent = require('./pkg/PKG/CatchFish/Events/PushFish')
const FireEvent = require('./pkg/PKG/CatchFish/Events/Fire')
const FishDeadEvent = require('./pkg/PKG/CatchFish/Events/FishDead')

const Bullet = require('./pkg/PKG/CatchFish/Bullet')
const Fish = require('./pkg/PKG/CatchFish/Fish')

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
		setTimeout(updatePing, 10);
	};
	setTimeout(updatePing, 1000);

	let enterMsg: EnterSuccess;
	// 待出生鱼
	let bornFishes: PushFishEvent[] = [];
	let frame = 0;

	// game loop.
	const gameUpdate = () => {
		if (!isConnect) return

		++frame;

		const self = enterMsg.self;
		const fishes = enterMsg.scene.fishs;
		const cannon = self.cannons[0];
		const bullets = cannon.bullets;

		// fire
		if (frame % 30 == 0) {
			const fire = new Fire();
			fire.frameNumber = frame;
			fire.cannonId = cannon.id;
			fire.bulletId = ++self.autoIncId;
			fire.angle = (frame / 100) % 31 * 0.1;
			if (self.sit == 2 || self.sit == 3) {
				fire.angle += 3.14;
			}
			sendMsg(msgEncoder.encode(fire, 0));
		}

		// update fish born
		for (const pushFish: PushFishEvent of bornFishes) {
			if (pushFish.born.beginFrameNumber >= frame) {
				fishes.push(pushFish.born.fish);
			}
		}

		if (fishes.length > 0 && bullets.length > 5) {
			const fishIdx = Math.floor(Math.random() * fishes.length);
			const hit = new Hit();
			hit.cannonId = cannon.id;
			hit.bulletId = bullets[0].id;
			hit.fishId = fishes[fishIdx].id;
			sendMsg(msgEncoder.encode(hit, 0));
			bullets.splice(0, 1);
		}

		// 60 PFS
		setTimeout(gameUpdate, 1000 / 60);
	};
	
	md.register(EnterSuccess.typeId, this, (msg: EnterSuccess) => {
		enterMsg = msg;
		frame = enterMsg.scene.frameNumber;
		gameUpdate();
		// $FlowFixMe
		console.log(util.inspect(msg, false, null, true));
	});

	md.register(Pong.typeId, this, (msg: Pong) => {
		// $FlowFixMe
		console.log(util.inspect(msg, false, null, true));
		console.log(`ping:${new Date().getTime() - lastPingTime}`);
	});

	md.register(PushFishEvent.typeId, this, (msg: PushFishEvent) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		bornFishes.push(msg);
	});

	md.register(FireEvent.typeId, this, (msg: FireEvent) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		if (msg.playerId == enterMsg.self.id) {
			const bullet: Bullet = new Bullet();
			bullet.id = msg.bulletId;
			bullet.angle = msg.angle;
			enterMsg.self.cannons[0].bullets.push(bullet);
		}
	});

	md.register(FishDeadEvent.typeId, this, (msg: FishDeadEvent) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		const fishes: Fish[] = enterMsg.scene.fishs;
		for (const id: number of msg.ids) {
			const idx = fishes.findIndex((fish) => fish.id == id);
			if (idx != -1) {
				fishes.splice(idx, 1);
			}
		}
	});

	md.register(FrameEvents.typeId, this, (msg: FrameEvents) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		for (const event of msg.events) {
			md.dispatch(event);
		}
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
