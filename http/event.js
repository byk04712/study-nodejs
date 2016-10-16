/**
 * 事件模块
 */

const EventEmitter = require('events').EventEmitter;
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(11);


myEmitter.on('event', () => {
	console.log('an event occurred !');
});

let funA = () => {
	console.log('funA');
}

myEmitter.emit('event');





myEmitter.on('event2', (a, b) => {
	console.log(a, b, this);
});

myEmitter.on('event2', (a, b) => {
	console.log(a, b, this);
});

myEmitter.emit('event2', 'a', 'b');




// 事件监听
myEmitter.once('newListener', (event, listener) => {
	// 如果是 event3 事件触发
	if (event === 'event3') {
		console.log('newListener', event);
	}
});

myEmitter.on('event3', () => {
	console.log('A');
});

myEmitter.emit('event3');