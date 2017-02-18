const http = require('http');

/*
更多学习 lodash 使用，请前往
	http://lodashjs.com/docs/
 */
const _ = require('lodash');

const PORT = 8080;

const server = http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	let result = _.defaults({
		a: 1
	}, {
		a: 3,
		b: 2
	});


	console.log('1:', result); // { a: 1, b: 2 }



	let par = _.partition([1, 2, 3, 4, 5], n => n % 2);
	console.log('2:', par); // [ [ 1, 3 ], [ 2, 4 ] ]



	// 将 array 拆分成多个 size 长度的块，把这些块组成一个新数组。 如果 array 无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。
	// 参数
	// array (Array): 需要被处理的数组。
	// [size=1] (number): 每个块的长度。
	console.log('3:', _.chunk(['a', 'b', 'c', 'd'], 2)); //[ [ 'a', 'b' ], [ 'c', 'd' ] ]
	console.log('3:', _.chunk(['a', 'b', 'c', 'd', 'e'], 3)); //[ [ 'a', 'b', 'c' ], [ 'd', 'e' ] ]


	// 创建一个新数组并包含原数组中所有的非假值元素。例如 false、null、 0、""、undefined 和 NaN 都是“假值”。
	console.log('4:', _.compact([1, null, '', 's', undefined, 0, NaN, 'hi'])); // [ 1, 's', 'hi' ]


	//参数
	// array (Array): 需要过滤的数组
	// [values] (...Array): 数组需要排除掉的值
	console.log('5:', _.difference([1, 3, 5, 6], [3, 4])); //[ 1, 5, 6 ]
	console.log('5:', _.difference(['1', 3, 'hi', 20], [1, 'hi'])); //[ '1', 3, 20 ]


	console.log('5:');

	res.end('OK');
});

server.listen(PORT, '127.0.0.1');

console.log('Server started at port ' + PORT);