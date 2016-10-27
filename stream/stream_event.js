/**
 * 流事件，使用流在操作文件时，监听流的变化
 */

const fs = require('fs');

const readStream = fs.createReadStream('app-debug.apk');
let n = 0;

/**
 * 数据传输中处罚该事件
 * @param  {[type]} 'data' [description]
 * @param  {[type]} (chunk [description]
 * @return {[type]}        [description]
 */
readStream
	.on('data', (chunk) => {
		n++;
		console.log('It is a buffer ? ', Buffer.isBuffer(chunk));
		console.log(`${chunk.length} bytes of data.`);
		// console.log('==============================================\n' + 
		// 	chunk.toString('utf8') + 
		// 	'\n==============================================');

		// 模拟异步实现
		readStream.pause();
		console.log('data pause');
		setTimeout(() => {
			console.log('data pause end');
			readStream.resume();
		}, 200);
	})
	.on('readable', () => {
		console.log('There is some data to read now.', n);
	})
	.on('end', () => {
		console.log('There will be no more data.', n);
	})
	.on('close', () => {
		console.log('The read stream will be close.', n);
	})
	.on('error', (e) => {
		console.log('There is an error ', e);
	});
