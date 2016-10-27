const stream = require('stream');
const Readable = stream.Readable;
const Writable = stream.Writable;


// 输入输出流实例
const readStream = new Readable();
const writeStream = new Writable();


// 往输入流中放入数据
readStream.push('This year is 2016');
readStream.push('Andy Q');
readStream.push(null);	// 表示读取完毕


// 重写 输出流的 write 方法
writeStream._write = function(chunk, encode, cb) {
	// 打印内容 chunk 是 Buffer 类型
	console.log(chunk.toString());
	cb && cb();
}


readStream.pipe(writeStream);