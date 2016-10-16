/**
 * 一个最简单的 node.js 程序
 */

// 1. 引入 http 模块
const http = require('http');

// 2. 创建一个服务
http.createServer((req, res) => {

	// 响应头  返回码：200 text/plain 纯文本
	res.writeHead(200, {'Content-Type': 'text/plain'});

	// 响应内容
	res.end('Hello Node.js');

}).listen(1337, '127.0.0.1');	// 在指定端口上启动服务

console.log('Server started at 127.0.0.1 on port 1337');