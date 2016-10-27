const http = require('http');
const fs = require('fs');
const request = require('request');

const sourceUrl = 'http://webmap0.map.bdstatic.com/wolfman/static/common/images/new/login-guide_00951fb.png';

http
	.createServer((req, res) => {

		// 方法1
		// 读取文件，将读取到的文件返回给客户端
		// fs.readFile('stream_copy_logo.png', (err, data) => {
		// 	if (err) {
		// 		throw err;
		// 	}

		// 	res.writeHeader(200, {
		// 		'Content-Type': 'image/png'	// 返回图片格式
		// 	});
		// 	res.end(data);
		// });
		
		// 方法2
		// fs.createReadStream('stream_copy_logo.png').pipe(res);
		
		// 方法3
		request(sourceUrl).pipe(res);
	})
	.listen(1337);
console.log('Server start at http://127.0.0.1:1337');