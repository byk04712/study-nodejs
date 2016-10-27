/**
 * 对 stream_copy_logo.js 进行增强，打印输出详情信息，且文件传输过程更加安全。
 */

// 引入 fs 模块
const fs = require('fs');


// 读取流
const rs = fs.createReadStream('app-debug.apk');
// 写入流
const ws = fs.createWriteStream('app-debug2.apk');



rs.on('data', (chunk) => {
	// 为防止数据还未读完，就执行了写入，则需要进行判断，如果未读完，则暂停
	// If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
	if (ws.write(chunk) === false) {
		rs.pause();// 暂停读取
		console.log('read stream paused');
	}
});

rs.on('end', () => {
	ws.end();
});

ws.on('drain', () => {
	rs.resume();
	console.log('read stream resume ------> ');
})