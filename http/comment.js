/**
 * 使用程序对网站进行自动评论
 */


const http = require('http');
const qs = require('querystring');


// 提交的表单数据
const formData = qs.stringify({
	content: '我就是看了这个视频，然后在公司里写了个js程序抢月饼，后来被开除了。',
	mid: 8837
});


const options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
		'Connection': 'keep-alive',
		'Content-Length': formData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=6bc35339-7c10-4fce-af6e-c3a607055f39; imooc_isnew_ct=1456291414; PHPSESSID=9vvqic1o7bv51mn36kqe5hrb50; jwplayer.mute=false; loginstate=1; apsid=U3OGY0YjFlZmU3Mzc4Nzg3ZGI3YzdlODhhOTZmYjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjQ0MTA2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3Mzk2OTQyMThAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGE2MjZhYmE3MWVlYjlhZGM2MjY4YzBiNjhhMjA1MWNkZFLqV2RS6lc%3DM2; last_login_username=739694218%40qq.com; jwplayer.volume=100; jwplayer.qualityLabel=è¶æ¸; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1474287944,1474547755; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1476627923; imooc_isnew=2; cvde=57e3d0277fba8-365',
		'Host': 'www.imooc.com',
		'Origin': 'http://www.imooc.com',
		'Referer': 'http://www.imooc.com/video/8837',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest'
	}
};

var req = http.request(options, (res) => {

	console.log('服务器返回状态码：', res.statusCode);
	console.log('服务器返回头信息：', res.headers);

	res.on('data', (data) => {
		console.log('data:', qs.stringify(data));
	});

	res.on('end', () => {
		console.log('留言成功');
	});

});

req.on('error', (error) => {
	console.log('留言异常：', error);
});

req.write(formData);

req.end();

