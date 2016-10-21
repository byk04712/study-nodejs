/**
 * request是个非常好用的针对HTTP请求的模块，简言之是对 http.request更高级的封装,口号是——“Simplified HTTP client”
 * request({
 * 	url: '你想抓的网址',
 * 	method: 'GET'
 * }, function(e, r, b) {// Callback 函数
 * 	e: 错误代码
 * 	b: 传回的资料内容
 * })
 */
var request = require('request');

/**
 * cheerio模块可以在服务器端像使用Jquery的方式一样操作Dom结构，许多用法和jquery 的语法基本相同，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。
 * 简言之，是服务器端的 jquery
 */
var cheerio = require('cheerio');
var fs = require('fs');



request({
	url: 'http://www.acfun.tv/v/list110/index.htm',
	// 请求方式
	method: 'GET'
}, function(e, r, b) {	// 回调函数
	// 如果有错误或没有资料
	if (e || !b) {
		return;
	}

	// b 就是我们请求成功的页面
	var $ = cheerio.load(b);
	// 搞个数组用于存放爬下来的内容
	var result = [];
	// 选择器里就是你从控制台里看到的标题的源码
	var titles = $(".mainer .item a.title");
	// 遍历并添加到数组中
	for (var i = 0; i < titles.length; i++) {
		result.push($(titles[i]).text());
	}
	fs.writeFileSync('result.json', JSON.stringify(result));
	console.log('抓取数据成功，数据保存在当前目录下的 result.json 文件中');
});