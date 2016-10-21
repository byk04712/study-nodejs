/**
 * 网络小爬虫，抓取历史上的今天数据
 * 重点演示如何运用 Promise
 */

const http = require('http');
const cheerio = require('cheerio');
const url = 'http://www.todayonhistory.com/';
const detailBaseUrl = 'http://www.todayonhistory.com/10/18/';


function getPageDataAsync(url) {
	return new Promise((resolve, reject) => {
		http
			.get(url, (res) => {

				let data = '';

				res.on('data', (thunk) => {
					data += thunk;
				});

				res.on('end', () => {
					resolve(data)
				});

			}).on('error', (e) => {
				reject(e);
			});
	});
}


/**
 * 过滤数据
 * @param  {[type]} data 网页 html 代码
 * @return {[type]}      返回的数据格式如下
 * [{
 * 		year: '',
 * 		event: ''
 * }]
 */
function filterData(data) {
	return new Promise((resolve, reject) => {
		const result = [];
		const $ = cheerio.load(data);
		$('#container li').each((index, item) => {
			const year = $(item).find('div>span').text();
			const event = $(item).find('div>a').text();

			result.push({
				year: year,
				event: event
			});
		});
		resolve(result);
	})
}

/**
 * 打印数据
 */
function printIt(data) {
	for(let i = 0; i < data.length; i++) {
		console.log(data[i].year + '\t' + data[i].event);
	}
}


// 调用
getPageDataAsync(url)
	.then(data => {
		return filterData(data);
	})
	.then(data => {
		printIt(data);
	})
	.catch((e) => {
		console.log('抓取数据异常：', e);
	});