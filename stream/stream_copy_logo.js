// 引入文件模块
var fs = require('fs');
// 读取文件，读取到的文件返回 Buffer 类型的对象
var source = fs.readFileSync('../buffer/logo.png');

console.log(Buffer.isBuffer(source));	// true

fs.writeFileSync('stream_copy_logo.png', source);