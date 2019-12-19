// @flow

const net = require('net');
const zz = require('./tools/zigzag');
const util = require('util');

const MsgDispatcher = require('./msg/msg-dispatcher');
const { MsgEncoder } = require('./msg/msg-encoder');

const { PkgBase } = require("./proto/pkg-base")

const Ping = require('./proto/pkg/generic/ping');
const Pong = require('./proto/pkg/generic/pong');

const Enter = require("./proto/pkg/client_catchfish/enter")
const Fire = require("./proto/pkg/client_catchfish/fire")
const Hit = require("./proto/pkg/client_catchfish/hit")

const EnterSuccess = require("./proto/pkg/catchfish_client/enter-success")
const FrameEvents = require("./proto/pkg/catchfish_client/frame-events")

const PushFishEvent = require('./proto/pkg/catchfish/events/push-fish');
const FireEvent = require('./proto/pkg/catchfish/events/fire');
const FishDeadEvent = require('./proto/pkg/catchfish/events/fish-dead');

const Bullet = require('./proto/pkg/catchfish/bullet');
const Fish = require('./proto/pkg/catchfish/fish');

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
client.connect(45621, '127.0.0.1', function() {
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
		setTimeout(updatePing, 3000);
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
		const fishes = enterMsg.scene.fishs.arr;
		const cannon = self.cannons.arr[0];
		const bullets = cannon.bullets.arr;

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
	
	md.register(EnterSuccess.pkgTypeId, this, (msg: EnterSuccess) => {
		enterMsg = msg;
		frame = enterMsg.scene.frameNumber;
		gameUpdate();
		// $FlowFixMe
		console.log(util.inspect(msg, false, null, true));
	});

	md.register(Pong.pkgTypeId, this, (msg: Pong) => {
		// $FlowFixMe
		console.log(util.inspect(msg, false, null, true));
		console.log(`ping:${new Date().getTime() - lastPingTime}`);
	});

	md.register(PushFishEvent.pkgTypeId, this, (msg: PushFishEvent) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		bornFishes.push(msg);
	});

	md.register(FireEvent.pkgTypeId, this, (msg: FireEvent) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		if (msg.playerId == enterMsg.self.id) {
			const cannon = enterMsg.self.cannons.arr[0];
			const bullets = cannon.bullets.arr;
			const bullet: Bullet = new Bullet();
			bullet.id = msg.bulletId;
			bullet.angle = msg.angle;
			bullets.push(bullet);
		}
	});

	md.register(FishDeadEvent.pkgTypeId, this, (msg: FishDeadEvent) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		const fishes: Fish[] = enterMsg.scene.fishs.arr;
		for (const id: number of msg.ids.arr) {
			const idx = fishes.findIndex((fish) => fish.id == id);
			if (idx != -1) {
				fishes.splice(idx, 1);
			}
		}
	});

	md.register(FrameEvents.pkgTypeId, this, (msg: FrameEvents) => {
		// $FlowFixMe
		// console.log(util.inspect(msg, false, null, true));
		for (const event of msg.events.arr) {
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
