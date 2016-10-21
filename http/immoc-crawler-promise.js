/**
 * 爬虫程序，抓取慕课网课程列表，和批量抓取课程详情信息
 */

const http = require('http');
const cheerio = require('cheerio');
const Promise = require('bluebird');

const url = 'http://www.imooc.com/u/102093/courses?sort=publish';
const baseUrl = 'http://www.immoc.com/learn/';

/**
 * 获取课程列表
 */
function getCourseList(url) {
	return new Promise((resolve, reject) => {
		
		http
			.get(url, (res) => {
				console.log(`正在抓取 ${url}`);
				let content = '';

				res.on('data', (thunk) => {
					content += thunk;
				});

				res.on('end', () => {
					// 将获取到的数据传递下去
					const json = filterCourseListData(content);
					resolve(json);
				});

			})
			.on('error', (e) => {
				// 出现异常时，将异常传递下去
				console.log(`抓取 ${url} 出现异常：`, e);
				reject(e);
			});
	})
}


/**
 * 过滤课程列表页数据，抓取有用的数据，组成数组对象
 * @param  {[type]} html html数据
 * @return {[type]}      {
 *          teacher: '',
 *          score: '',
 *          experience: '',
 *          introduce: '',
 *          care: 0,
 *          followed: 0,
 *          portrait: '',
 *         	courses: [{
 *          	id: '',
 *           	name: '',
 *            	level: '',
 *             	time: '',
 *              status: '',
 *              slogon: '',
 *              img_url: ''
 *          }]
 * }
 */
function filterCourseListData(html) {
	try {
		const $ = cheerio.load(html);

		let teacher = $('.user-name > span').text();
		let score = $('.u-info-credit em').text();
		let experience = $('.u-info-mp em').text();
		let introduce = $('.user-desc').text();
		let care = $('.follows em').text();
		let followed = $('.followers em').text();
		let portrait = $('.img').attr('src');
		
		let courseList = [];
		$('.js-course-list li.course-one').each((i, el) => {
			let id = $(el).attr('data-courseid');
			let name = $(el).find('.study-hd > a').text();
			let level = $($(el).find('.study-points .span-common')[0]).text();
			let time = $(el).find('.study-points .i-mid').text();
			let status = $(el).find('.study-points .i-right').text();
			let slogon = $(el).find('.catog-points').text().trim();
			let imgUrl = $(el).find('.course-list-img img').attr('src');

			courseList.push({
				id: id,
				name: name,
				level: level,
				time: time,
				status: status,
				slogon: slogon,
				img_url: imgUrl
			});
		});

		return {
			teacher: teacher,
			score: score,
			experience: experience,
			introduce: introduce,
			care: care,
			followed: followed,
			portrait: portrait,
			courses: courseList
		};
	} catch(e) {
		console.log('过滤课程列表数据出错：', e);
		return null;
	}
}

/**
 * 过滤课程详情页数据，抓取有用的数据，组成数组对象
 * @param  {[type]} html html数据
 * @return {[type]}      [{
 *         id: '',
 *         name: '',
 *         score: '',
 *         time: '',
 *         studied: '',
 *         level: '',
 *         description: '',
 *         chapterList: [
 *         	{
 *         		chapterName: '',
 *         		videos: [{
 *         			id: '',
 *         			name: ''
 *         		}]
 *         	}
 *         ]
 * }]
 */
function filterCourseData(html) {
	try {
		const $ = cheerio.load(html);
		let result = [];

		let courseId = $('i.js-follow-action').attr('data-cid');
		let name = $('.hd h2.l').text();
		let score = $('.score-btn .meta-value').value();
		let time = $($('div.static-item.l .meta-value')[3]).value();
		let studied = $('.js-learn-num').value();
		let level = $($('div.static-item.l .meta-value')[2]).value();
		let description = $('.auto-wrap').value();
		let chapterList = [];
		$('.mod-chapters div').each((i, el) => {
			let chapterName = $(el).find('.icon-chapter').text();
			let videos = [];
			$(el).find('.video li').each((j, ele) => {
				let id = $(ele).attr('data-media-id');
				let name = $(ele).find('a').text();
				videos.push({
					id: id,
					name: name
				})
			});
			chapterList.push({
				chapterName: chapterName,
				videos: videos
			});
		});

		result.push({
			id: courseId,
			name: name,
			score: score,
			time: time,
			studied: studied,
			level: level,
			description: description,
			chapterList: chapterList
 		});

		return result;
	} catch(e) {
		console.log('过滤课程详情数据出错：', e);
		return null;
	}
}


/**
 * 获取课程详细数据
 * @param  {[type]} url 课程详情页url
 * @return {[type]}     [description]
 */
function getCourseDetail(url) {
	return new Promise((resolve, reject) => {
		http
			.get(url, (res) => {
				console.log(`正在抓取: ${url}`);

				let data = '';

				res.on('data', (thunk) => {
					data += thunk;
				});

				res.on('end', () => {
					const json = filterCourseData(data);
					resolve(json);
				});

			})
			.on('error', (e) => {
				console.log('获取课程详情失败：', e);
				reject(e);
			});
	});
}

getCourseDetail(baseUrl + '120')
	.then(result => {
		console.log('\t\t', result);
	})


/**
 * 调用
 */
getCourseList(url)
	.then(result => {

		console.log('老师：' + result.teacher + '\n'
			+ '积分：' + result.score + '\n'
			+ '经验：' + result.experience + '\n'
			+ '简介：' + result.introduce + '\n'
			+ '关注人数：' + result.care + '\n'
			+ '粉丝：' + result.followed + '\n'
			+ '课程数量：' + result.courses.length + ' 门课程');


		// Promise 数组
		let fetchAsyncArray = [];
		result.courses.forEach((item, index) => {
			console.log('    课程名称：' + item.name);
			console.log('    难度级别：' + item.level);
			console.log('    课时：' + item.time);
			console.log('    更新状态：' + item.status);
			console.log('    简介：' + item.slogon);
			console.log('\n');
			fetchAsyncArray.push(getCourseDetail(baseUrl + item.id));
		});

		return Promise.all(fetchAsyncArray);
	})
	.then(result => {
		result.forEach((item, index) => {
			console.log('        课程名称：' + item.name);
			console.log('        综合评分：' + item.score);
			console.log('        课程时长：' + item.time);
			console.log('        学习人数：' + item.studied);
			console.log('        难度级别：' + item.level);
			console.log('        课程简介：' + item.description);

			item.chapterList.forEach((el, i) => {
				console.log('            ' + el.chapterName);
				el.videos.forEach((video, j) => {
					console.log('                ' + video.name);
				});
			});
			console.log('\n');
		});
	})
	.catch(e => {
		console.log('出现异常：', e);
	});
