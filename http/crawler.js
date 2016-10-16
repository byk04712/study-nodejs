/**
 * 简单爬虫
 */

// 导入 http 模块
const http = require('http');

// 抓取数据的 url
const url = 'http://www.baidu.com';

// get 请求
http
	.get(url, (res) => {

		var html = '';

		// 监听 data 事件
		res.on('data', (data) => {
			html += data;
		});

		// 抓取完毕后执行
		res.on('end', () => {
			console.log(html);
		});

	})
	// 监听异常事件
	.on('error', (e) => {
		console.error('抓取数据失败：', e);
	});