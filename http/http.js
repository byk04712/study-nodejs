const http = require('http');

http
	.createServer((req, res) => {
		
		res.writeHead(200, {'Content-Type':'text/plain'});

		res.write('Hello Nodejs');

		res.end();

	})
	.listen(1337);

console.log('Server started at 127.0.0.1 on 1337');