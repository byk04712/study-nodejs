/**
 * fs 模块读取文件
 */

const fs = require('fs');



fs.readFile('logo.png', (err, data) => {
	if (err) throw err;

	// 输出是否为 buffer
	console.log(Buffer.isBuffer(data));
	console.log('图片data：', data);

	// 写出文件
	fs.writeFile('logo_buffer.png', data, (err) => {
		if (err) {
			console.log('写出文件失败：', err);
			throw err;
		}
		console.log('写出文件成功');
	});

	let base64Image = data.toString('base64');
	console.log('\n\n图片base64数据：data:image/png;base64,', base64Image);

	var decodeImage = new Buffer(base64Image, 'base64');
	console.log('\n\ndecodeImage：', decodeImage);
	console.log(Buffer.compare(data, decodeImage));

	fs.writeFile('logo_decode.png', decodeImage, (err) => {
		if (err) {
			console.log('写出解码图片文件失败：', err);
			throw err;
		}
		console.log('写出解码图片成功');
	})
})