/**
 * 实现QQ空间留言
 */



const http = require('http');
const qs = require('querystring');
const url = require('url');

const formData = qs.stringify({
	'qzreferrer': 'http://ctc.qzs.qq.com/qzone/msgboard/msgbcanvas.html#page=1',
	'content': '过来看一看.',
	'hostUin': '3347328881',
	'uin': '739694218',
	'format': 'fs',
	'inCharset': 'utf-8',
	'outCharset': 'utf-8',
	'iNotice': '1',
	'ref': 'qzone',
	'json': '1',
	'g_tk': '1846238966'
});

const options = url.parse('http://h5.qzone.qq.com/proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?g_tk=1846238966');
options.port = 80;
options.method = 'POST';
// 请求头信息
options.headers = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
	'Cache-Control': 'max-age=0',
	'Connection': 'keep-alive',
	'Content-Length': formData.length,
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': 'randomSeed=831303; pac_uid=1_739694218; __Q_w_s_hat_seed=1; __Q_w_s__QZN_TodoMsgCnt=1; tvfe_boss_uuid=2bf42c303b925ffb; QZ_FE_WEBP_SUPPORT=1; cpu_performance_v8=14; __Q_w_s__appDataSeed=1; o_cookie=739694218; ptui_loginuin=739694218; pgv_info=ssid=s4626543540&ssi=s434767641; pgv_pvid=90302994; ptisp=ctc; RK=8GsbeL0iFJ; ptcz=58251fb81a7652914e2a2a6a151fd3ea18ba2d483ab4f3613877cf71fb9638c7; pt2gguin=o0739694218; uin=o0739694218; skey=MIS9uAmOJZ; p_uin=o0739694218; p_skey=FC-Bikw9olDYHsu-mQQEGI9I7ESU9jFKiRD60qlV*Ro_; pt4_token=jz4kQ*k44U2yHwm7bag99yRUiOWCYtIS6A84XpPhsjg_; qzone_check=739694218_1476630907; qzspeedup=sdch; pgv_pvi=778760192; pgv_si=s8515412992; blabla=dynamic',
	'Host': 'h5.qzone.qq.com',
	'Origin': 'http://ctc.qzs.qq.com',
	'Referer': 'http://ctc.qzs.qq.com/qzone/msgboard/msgbcanvas.html',
	'Upgrade-Insecure-Requests': '1',
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
};

const req = http.request(options, (res) => {

	console.log('服务器返回状态码：', res.statusCode);
	console.log('服务器返回头信息：', res.headers);

	res.on('data', (thunk) => {
		console.log('BODY: ', qs.stringify(thunk));
	});

	res.on('end', () => {
		if (res.statusCode == 200) {
			console.log('恭喜你，留言成功！');
		} else {
			console.log('留言失败，服务器返回码：' + res.statusCode);
		}
	});

});

req.on('error', (e) => {
	console.log('qq留言异常：', e);
})

req.write(formData);

req.end();