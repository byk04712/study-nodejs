/**
 * 抓取网络数据
 */


const http = require('http');
// 导入 cheerio 类似 jquery 插件
const cheerio = require('cheerio');

const url = 'http://www.imooc.com';


/**
 * 数据过滤
 * @param  {[type]} html [description]
 * @return
 * [{
 * 		category: '',
 * 		courses: [],
 * 		recommend: []
 * }]
 */
function filterData(html) {
	
	const $ = cheerio.load(html);
	const categories = $('.item');

	let data = [];
	let types = [];

	categories.each((index, item) => {
		types.push($(item).find('.group').text());
	});

	$('.submenu').each((index, item) => {

		let courses = [];
		$(item).find('a[href*="/course/list?c="]').each((j, a) => {
			courses.push($(a).text());
		});

		let recommends = [];
		$(item).find('.w625').each((j, a) => {
			recommends.push($(a).text());
		});

		data.push({
			category: types[index],
			courses: courses,
			recommend: recommends
		});
	});

	return data;
}


/**
 * 打印数据
 */
function printIt(data) {
	data.forEach((item, i) => {
		console.log(item.category);
		console.log('\t分类：');
		
		item.courses.forEach((course, j) => {
			console.log('\t\t' + course);
		});

		console.log('\t推荐：');
		item.recommend.forEach((recommend, k) => {
			console.log('\t\t' + recommend);
		});
	});
}


http
	.get(url, (res) => {
		
		var html = '';

		res.on('data', (data) => {
			html += data;
		});

		res.on('end', () => {
			let data = filterData(html);

			printIt(data);
		});

	})
	.on('error', (e) => {
		console.error('抓取数据异常: ', e);
	});