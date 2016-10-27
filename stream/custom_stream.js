/**
 * 定制的 可读流
 * 定制的 可写流
 * 定制的 转换流
 */


const stream = require('stream');
const util = require('util');


// 可读流对象
function ReadStream() {
	stream.Readable.call(this);
}

// ReadStream 继承至 stream.Readable
util.inherits(ReadStream, stream.Readable);

// 重写 read 方法
ReadStream.prototype._read = function() {
	this.push('This');
	this.push(' year');
	this.push(' is');
	this.push(' 2016');
	this.push('Andy Q');
	this.push(null);
}




// 可写流对象
function WriteStream() {
	stream.Writable.call(this);
	this._cached = new Buffer('');
}

// WriteStream 继承至 stream.Writable
util.inherits(WriteStream, stream.Writable);

// 重写 write 方法
WriteStream.prototype._write = function(chunk, encoding, callback) {
	// 输出打印
	console.log(chunk.toString());
	callback && callback();
}



// 转换流对象
function TransformStream() {
	stream.Transform.call(this);
}

// TransformStream 继承至 stream.Transform
util.inherits(TransformStream, stream.Transform);

// 重写 transform 方法
TransformStream.prototype._transform = function(chunk, encoding, callback) {
	this.push('~ ' + chunk);
	callback();
}

// 重写 flush 方法
TransformStream.prototype._flush = function(callback) {
	this.push('--------------------');
	callback();
}



var rs = new ReadStream();
var ws = new WriteStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);